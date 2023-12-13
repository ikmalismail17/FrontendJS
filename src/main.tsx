import ReactDOM from 'react-dom';
import { ColorModeProvider } from './components/ToggleColorMode'; // Update the import path
import App from './App';
import { AuthProvider } from './AuthContext';

ReactDOM.render(
  <AuthProvider>
    <ColorModeProvider>
      <App />
    </ColorModeProvider>
  </AuthProvider>,
  document.getElementById('root')
);
