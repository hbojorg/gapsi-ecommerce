import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import WelcomePage from './pages/WelcomePage';
import ProveedoresPage from './pages/ProveedoresPage';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/proveedores" element={<ProveedoresPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
