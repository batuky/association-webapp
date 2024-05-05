import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login/Login';
import ForgotPassword from './pages/login/ForgotPassword';
import SmsVerificationPage from './pages/authentication/SmsVerificationPage';
import AssociationsHome from './pages/assosiations/AssosiationsHome';
import FamiliesHome from './pages/families/FamiliesHome';
import RequirementsHome from './pages/requirements/RequirementsHome';
import UsersHome from './pages/users/UsersHome';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/giris" element={<Login />} />
        <Route path="/sifremi-unuttum" element={<ForgotPassword />} />
        <Route path="/sms-dogrulama" element={<SmsVerificationPage />} />
        <Route path='/yardimlar' element={<AssociationsHome />} />
        <Route path='/aileler' element={<FamiliesHome />} />
        <Route path='/ihtiyaclar' element={<RequirementsHome />} />
        <Route path='/kullanicilar' element={<UsersHome />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();