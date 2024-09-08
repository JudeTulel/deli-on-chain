import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { OrderProvider } from './context/OrderContext'; // Import the OrderProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OrderProvider>
      <App />
    </OrderProvider>
  </StrictMode>
);
