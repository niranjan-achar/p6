import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Display_Inventory,  AddInventory} from './to_inventory';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AddInventory />
  </React.StrictMode>
);

reportWebVitals();
