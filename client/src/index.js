import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Login from './pages/login/Login';
import ForgotPassword from './pages/login/ForgotPassword';
import SmsVerificationPage from './pages/authentication/SmsVerificationPage';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/giris" element={<Login />} />
        <Route path="/sidebar" element={<sidebar />} />
        <Route path="/Layout" element={<Layout />} />
        <Route path="/sifremi-unuttum" element={<ForgotPassword />} />
        <Route path="/sms-dogrulama" element={<SmsVerificationPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();