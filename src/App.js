import React, { useState } from "react";
import { ApplicationProvider } from './context/AplicationContext';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import ONamaPage from './pages/ONamaPage';
import RasporedPage from './pages/RasporedPage';
import TabelaPage from './pages/TabelaPage';
import TimoviPage from './pages/TimoviPage';
import RezultatiPage from './pages/RezultatiPage';
import MediaPage from './pages/MediaPage';
import KontaktPage from './pages/KontaktPage';
import Footer from './components/Footer';

function App() {
  //const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <ApplicationProvider>
      <Header />
    <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/raspored" element={<RasporedPage />} />
        <Route path="/rezultati" element={<RezultatiPage />} />
        <Route path="/tabela" element={<TabelaPage />} />
        <Route path="/timovi" element={<TimoviPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/onama" element={<ONamaPage />} />
        <Route path="/kontakt" element={<KontaktPage />} />
      </Routes>
      <Footer />
    </ApplicationProvider>
  );
}

export default App;
