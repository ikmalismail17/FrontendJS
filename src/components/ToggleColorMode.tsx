import React, { useState, useMemo, ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export interface ColorModeProps {
  toggleColorMode: () => void;
}

const ColorModeContext = React.createContext<ColorModeProps | undefined>(undefined);

export const useColorMode = () => {
  const context = React.useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
};

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>(localStorage.getItem('colorMode') === 'dark' ? 'dark' : 'light');

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('colorMode', newMode);
    // setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            light: mode === 'dark' ? '#263238' : '#90a4ae', //grey blue
            main: mode === 'dark' ? '#0277bd' : '#4fc3f7', //blue
            dark: mode === 'dark' ? '#2e7d32' : '#4caf50', //green
            contrastText: mode === 'dark' ? '#fff' : '#000', //black & white
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
