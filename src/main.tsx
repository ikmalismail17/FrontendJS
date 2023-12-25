import ReactDOM from 'react-dom';
import { ColorModeProvider } from './hooks/ToggleColorMode'; // Update the import path
import App from './App';
import { AuthProvider } from './hooks/AuthContext';

ReactDOM.render(
  <AuthProvider>
    <ColorModeProvider>
      <App />
    </ColorModeProvider>
  </AuthProvider>,
  document.getElementById('root')
);
