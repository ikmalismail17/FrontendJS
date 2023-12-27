import { createRoot } from 'react-dom/client';
import { ColorModeProvider } from './hooks/ToggleColorMode';
import App from './App';
import { AuthProvider } from './hooks/AuthContext';

const rootElement = document.getElementById('root');

// Use createRoot instead of ReactDOM.render
const root = createRoot(rootElement!);

root.render(
  <AuthProvider>
    <ColorModeProvider>
      <App />
    </ColorModeProvider>
  </AuthProvider>
);
