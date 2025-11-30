import React from 'react';

const TrackingModal = ({ order, onClose }) => {
  const generateTrackingStatus = (order) => {
    const statusConfig = {
      'Pending': {
        steps: [
          { status: 'Order Placed', description: 'Your order has been received', completed: true },
          { status: 'Payment Processing', description: 'Processing your payment', completed: order.status === 'Paid' },
          { status: 'Queue', description: 'Waiting in laundry queue', completed: false },
          { status: 'Processing', description: 'Preparing your laundry', completed: false },
          { status: 'Ready for Pickup', description: 'Your order is ready!', completed: false }
        ],
        estimate: '30-45 min'
      },
      'Processing': {
        steps: [
          { status: 'Order Placed', description: 'Your order has been received', completed: true },
          { status: 'Payment Confirmed', description: 'Payment processed successfully', completed: true },
          { status: 'Washing', description: 'Your clothes are being washed', completed: false },
          { status: 'Drying', description: 'Your clothes are being dried', completed: false },
          { status: 'Quality Check', description: 'Final inspection', completed: false },
          { status: 'Ready for Pickup', description: 'Your order is ready!', completed: false }
        ],
        estimate: '20-30 min'
      },
      'Completed': {
        steps: [
          { status: 'Order Placed', description: 'Your order has been received', completed: true },
          { status: 'Payment Confirmed', description: 'Payment processed successfully', completed: true },
          { status: 'Washing', description: 'Your clothes were washed', completed: true },
          { status: 'Drying', description: 'Your clothes were dried', completed: true },
          { status: 'Quality Check', description: 'Quality inspection passed', completed: true },
          { status: 'Ready for Pickup', description: 'Your order is ready for pickup!', completed: true }
        ],
        estimate: 'Completed'
      }
    };

    const config = statusConfig[order.status] || statusConfig['Pending'];
    const currentStep = order.status === 'Pending' ? 1 : 
                       order.status === 'Paid' ? 2 : 
                       order.status === 'Processing' ? 3 : 
                       order.status === 'Completed' ? 6 : 1;
    
    return {
      steps: config.steps.map((step, index) => ({
        ...step,
        completed: index < currentStep,
        current: index === currentStep - 1,
        time: step.completed ? getRandomTime() : ''
      })),
      estimate: config.estimate
    };
  };

  const getRandomTime = () => {
    const times = ['10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM'];
    return times[Math.floor(Math.random() * times.length)];
  };

  const trackingData = generateTrackingStatus(order);
  const completedSteps = trackingData.steps.filter(step => step.completed).length;
  const totalSteps = trackingData.steps.length;
  const progress = (completedSteps / totalSteps) * 100;

  return (
    <div className="modal-overlay">
      <div className="modal tracking-modal">
        <div className="modal-header">
          <h3>📍 Order Tracking</h3>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>
        <div className="modal-body">
          <div className="tracking-header">
            <h4>Order #{order.id}</h4>
            <p>{order.service_type} • {order.weight}kg • ${order.price}</p>
            <div className="order-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="progress-stats">
                <span>Step {completedSteps} of {totalSteps}</span>
                <span>{progress.toFixed(0)}% Complete</span>
              </div>
            </div>
          </div>

          <div className="delivery-estimate">
            <h5>🕐 Estimated Completion</h5>
            <p>{trackingData.estimate}</p>
          </div>
          
          <div className="tracking-timeline">
            {trackingData.steps.map((step, index) => (
              <div key={index} className={`
                timeline-step 
                ${step.completed ? 'completed' : ''} 
                ${step.current ? 'current' : ''}
              `}>
                <div className="timeline-marker">
                  {step.completed ? '✓' : (step.current ? '⏳' : (index + 1))}
                </div>
                <div className="timeline-content">
                  <h5>{step.status}</h5>
                  <p>{step.description}</p>
                  {step.time && <span className="timeline-time">{step.time}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="tracking-actions">
            <button className="btn-secondary">📞 Contact Support</button>
            <button className="btn-primary">🔄 Refresh Status</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingModal;