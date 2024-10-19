import { createRoot } from 'react-dom/client';
import App from './app/ui/app/App.tsx';
import './app/config/globalStyles/index.scss';

createRoot(document.getElementById('root')!).render(<App />);
