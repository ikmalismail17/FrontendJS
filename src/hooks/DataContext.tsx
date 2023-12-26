// DataContextA.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DataContextProps {
  children: ReactNode;
}

interface DataContextValue {
  dataReport: string;
  changeReport: boolean;
  setDataReport: React.Dispatch<React.SetStateAction<string>>;
  setChangeReport: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<DataContextProps> = ({ children }) => {
  const [dataReport, setDataReport] = useState('');
  const [changeReport, setChangeReport] = useState<boolean>(false);

  return (
    <DataContext.Provider value={{ dataReport, changeReport, setDataReport, setChangeReport }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextValue => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataA must be used within a DataProviderA');
  }
  return context;
};
