const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

app.use(cors());
app.use(bodyParser.json());

// SQLite DB
const dbFile = path.join(__dirname, 'laundromat.db');
const db = new sqlite3.Database(dbFile);

// Initialize tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'customer'
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER,
        service_type TEXT,
        weight REAL,
        price REAL,
        status TEXT DEFAULT 'Received',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(customer_id) REFERENCES users(id)
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        amount REAL,
        method TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(order_id) REFERENCES orders(id)
    )`);
});

// Helper: authenticate middleware
function authenticate(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        req.user = payload;
        next();
    });
}

// Routes
app.get('/', (req, res) => res.json({ message: 'Laundromat Backend Running' }));

// Register
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
    const hashed = bcrypt.hashSync(password, 8);
    const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    stmt.run(name || '', email, hashed, function(err) {
        if (err) return res.status(400).json({ error: err.message });
        const user = { id: this.lastID, name: name || '', email, role: 'customer' };
        const token = jwt.sign(user, JWT_SECRET, { expiresIn: '30d' });
        res.json({ user, token });
    });
    stmt.finalize();
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(400).json({ error: 'User not found' });
        const ok = bcrypt.compareSync(password, row.password);
        if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
        const user = { id: row.id, name: row.name, email: row.email, role: row.role };
        const token = jwt.sign(user, JWT_SECRET, { expiresIn: '30d' });
        res.json({ user, token });
    });
});

// Create order
app.post('/api/orders', authenticate, (req, res) => {
    const { service_type, weight, price } = req.body;
    const customer_id = req.user.id;
    const stmt = db.prepare('INSERT INTO orders (customer_id, service_type, weight, price) VALUES (?, ?, ?, ?)');
    stmt.run(customer_id, service_type, weight || 0, price || 0, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        db.get('SELECT * FROM orders WHERE id = ?', [this.lastID], (e, row) => {
            res.json(row);
        });
    });
    stmt.finalize();
});

// Get orders (user sees own; admin sees all)
app.get('/api/orders', authenticate, (req, res) => {
    if (req.user.role === 'admin') {
        db.all('SELECT * FROM orders ORDER BY created_at DESC', [], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    } else {
        db.all('SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC', [req.user.id], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    }
});

// Update order status (attendant/admin)
app.put('/api/orders/:id/status', authenticate, (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    // Only staff/admin can update (role check)
    if (!['attendant','admin'].includes(req.user.role)) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    db.run('UPDATE orders SET status = ? WHERE id = ?', [status, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        db.get('SELECT * FROM orders WHERE id = ?', [id], (e, row) => {
            res.json(row);
        });
    });
});

// Make payment (simulate)
app.post('/api/payments', authenticate, (req, res) => {
    const { order_id, amount, method } = req.body;
    const stmt = db.prepare('INSERT INTO payments (order_id, amount, method) VALUES (?, ?, ?)');
    stmt.run(order_id, amount || 0, method || 'cash', function(err) {
        if (err) return res.status(500).json({ error: err.message });
        db.get('SELECT * FROM payments WHERE id = ?', [this.lastID], (e, row) => {
            // update order status to Paid
            db.run('UPDATE orders SET status = ? WHERE id = ?', ['Paid', order_id]);
            res.json(row);
        });
    });
    stmt.finalize();
});

// Get simple stats (admin)
app.get('/api/stats', authenticate, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    db.serialize(() => {
        db.get('SELECT COUNT(*) as total_orders FROM orders', [], (err, a) => {
            db.get('SELECT COUNT(*) as total_payments FROM payments', [], (err2, b) => {
                res.json({ total_orders: a.total_orders, total_payments: b.total_payments });
            });
        });
    });
});

// Seed admin user if none exists
db.get('SELECT * FROM users WHERE role = ?', ['admin'], (err, row) => {
    if (!row) {
        const hashed = bcrypt.hashSync('admin123', 8);
        db.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', ['Admin', 'admin@laundry.com', hashed, 'admin']);
        console.log('Seeded admin@laundry.com / admin123');
    }
});

app.listen(PORT, () => console.log(`Laundromat backend running on port ${PORT}`));
