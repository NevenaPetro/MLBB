import React from 'react';
import { ApplicationProvider } from './context/AplicationContext';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import ONamaPage from './pages/ONamaPage';
import RasporedPage from './pages/RasporedPage';
import RezultatiPage from './pages/RezultatiPage';
import Footer from './components/Footer';

function App() {
  return (
    <ApplicationProvider>
      <Header />
    <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/onama" element={<ONamaPage />} />
        <Route path="/raspored" element={<RasporedPage />} />
        <Route path="/rezultati" element={<RezultatiPage />} />
      </Routes>
      <Footer />
    </ApplicationProvider>
  );
}

export default App;
