// SnackbarContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface SnackbarState {
  openSnack: boolean;
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

interface SnackbarContextProps {
  snackbarState: SnackbarState;
  openSnackbar: (newState: Partial<SnackbarState>) => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    openSnack: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const openSnackbar = (newState: Partial<SnackbarState>) => {
    setSnackbarState({ ...snackbarState, ...newState, openSnack: true });
  };

  const closeSnackbar = () => {
    setSnackbarState({ ...snackbarState, openSnack: false });
  };

  return (
    <SnackbarContext.Provider value={{ snackbarState, openSnackbar, closeSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
