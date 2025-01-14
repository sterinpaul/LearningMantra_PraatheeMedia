import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from "@material-tailwind/react";
import {RecoilRoot} from 'recoil'
import { ToastContainer } from 'react-toastify';
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RecoilRoot>
        <ToastContainer position="top-right" hideProgressBar={true} pauseOnFocusLoss={false} autoClose={2000} />
        <App />
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>
)
