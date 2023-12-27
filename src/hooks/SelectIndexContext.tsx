import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SelectedIndexContextProps {
    children: ReactNode;
}

interface SelectedIndexContextValue {
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  setIndexByRoute: (route: string) => void;
}

const SelectedIndexContext = createContext<SelectedIndexContextValue | undefined>(undefined);

export const SelectedIndexProvider: React.FC<SelectedIndexContextProps>= ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const setIndexByRoute = (route: string) => {
    // Logic to map route to index
    let index = 0; // Default index

    // Update index based on route
    if (route === '/admindashboard/data') {
      index = 1;
    } else if (route === '/admindashboard/alarm') {
      index = 2;
    } else if (route === '/admindashboard/profile') {
      index = 3;
    } else if (route === '/admindashboard/report') {
      index = 4;
    }

    setSelectedIndex(index);
  };

  return (
    <SelectedIndexContext.Provider value={{ selectedIndex, setSelectedIndex, setIndexByRoute }}>
      {children}
    </SelectedIndexContext.Provider>
  );
};

export const useSelectedIndex = (): SelectedIndexContextValue => {
  const context = useContext(SelectedIndexContext);
  if (!context) {
    throw new Error('useSelectedIndex must be used within a SelectedIndexProvider');
  }
  return context;
};
