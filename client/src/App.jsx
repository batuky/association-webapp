import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index';
import Login from './pages/Authentication/Login';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import FinancalAidsHome from './pages/FinancialAids/index';
import FamiliesHome from './pages/Families/index';
import RequirementsHome from './pages/Requirements/index';
import UsersHome from './pages/Users/index';
import PageLayout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/giris" element={<Login />} />
        <Route path="/sifremi-unuttum" element={<ForgotPassword />} />
        <Route
          path="*"
          element={
            <PageLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/finansal-yardimlar" element={<FinancalAidsHome />} />
                <Route path="/aileler" element={<FamiliesHome />} />
                <Route path="/ihtiyaclar" element={<RequirementsHome />} />
                <Route path="/kullanici" element={<UsersHome />} />
              </Routes>
            </PageLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;