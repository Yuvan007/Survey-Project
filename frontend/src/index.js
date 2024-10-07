import { createRoot } from 'react-dom/client'; 
import App from './app';  
import './components/style.css';  

// Create a root and render the App component
const root = createRoot(document.getElementById('root')); 
root.render(<App/>);
