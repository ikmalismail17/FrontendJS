import ReactDOM from 'react-dom';
import { ColorModeProvider } from './components/ToggleColorMode'; // Update the import path
import App from './App';

ReactDOM.render(
  <ColorModeProvider>
    <App />
  </ColorModeProvider>,
  document.getElementById('root')
);
