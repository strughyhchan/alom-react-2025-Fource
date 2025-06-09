import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
document.body.style.margin = '0';
document.body.style.padding = '0';
document.documentElement.style.margin = '0';
document.documentElement.style.padding = '0';
document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.body.style.overflowX = 'hidden';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


