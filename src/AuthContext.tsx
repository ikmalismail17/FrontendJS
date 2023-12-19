import React from 'react';
import { createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void; // Add a logout method
  id: string | null;
  setId: (id: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const storedId = localStorage.getItem('id');
  const [token, setTokenState] = React.useState<string | null>(storedToken);
  const [id, setIdState] = React.useState<string | null>(storedId);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  };

  const setId = (newId: string | null) => {
    setIdState(newId);
    if (newId) {
        localStorage.setItem('id', newId);
    }else {
        localStorage.removeItem('id');
    }
  };
  
  const logout = () => {
    // Clear the token from state or storage
    setToken(null);
    setId(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, id, setToken, logout, setId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
