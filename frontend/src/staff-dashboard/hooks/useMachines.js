import { createContext, useContext, useState } from 'react';

const MachinesContext = createContext();

export const MachinesProvider = ({ children }) => {
  const [machines, setMachines] = useState([]);

  const value = {
    machines,
    setMachines
  };

  return (
    <MachinesContext.Provider value={value}>
      {children}
    </MachinesContext.Provider>
  );
};

export const useMachines = () => {
  const context = useContext(MachinesContext);
  if (!context) {
    throw new Error('useMachines must be used within MachinesProvider');
  }
  return context;
};