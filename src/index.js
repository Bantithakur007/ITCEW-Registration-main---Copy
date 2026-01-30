import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './Context/Auth';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <BrowserRouter>
      <AuthProvider>

        <App />
        <ToastContainer
          bodyClassName="toastBody"
        />
      </AuthProvider>
    </BrowserRouter>
  
);

