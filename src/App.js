import React from 'react';
import { ApplicationProvider } from './context/AplicationContext';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import ONamaPage from './pages/ONamaPage';
import UtakmicePage from './pages/UtakmicePage';
import TabelaPage from './pages/TabelaPage';
import TimoviPage from './pages/TimoviPage';
import StatistikaPage from './pages/StatistikaPage';
import MediaPage from './pages/MediaPage';
import KontaktPage from './pages/KontaktPage';
import Footer from './components/Footer';

function App() {
  return (
    <ApplicationProvider>
      <Header />
    <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/onama" element={<ONamaPage />} />
        <Route path="/utakmice" element={<UtakmicePage />} />
        <Route path="/tabela" element={<TabelaPage />} />
        <Route path="/timovi" element={<TimoviPage />} />
        <Route path="/statistika" element={<StatistikaPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/kontakt" element={<KontaktPage />} />
      </Routes>
      <Footer />
    </ApplicationProvider>
  );
}

export default App;
