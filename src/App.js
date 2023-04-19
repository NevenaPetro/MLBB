import React, { useState, useEffect } from "react";
import { ApplicationProvider } from "./context/AplicationContext";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import ONamaPage from "./pages/ONamaPage";
import RasporedPage from "./pages/RasporedPage";
import TabelaPage from "./pages/TabelaPage";
import TimoviPage from "./pages/TimoviPage";
import RezultatiPage from "./pages/RezultatiPage";
import MediaPage from "./pages/MediaPage";
import KontaktPage from "./pages/KontaktPage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import LoginHeader from "./components/LoginHeader/LoginHeader";
import {
  collection,
  getDocs,
  addDoc,
  query,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase.config';

function App() {
  const [teams, setTeams] = useState([]);
  const [locations, setLocations] = useState([]);


  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const q = query(collection(db, 'teams'));
        const querySnap = await getDocs(q);
        const teams = [];

        querySnap.forEach((doc) => {
          return teams.push({
            id: doc.id,
            name: doc.data().name,
            group: doc.data().group,
          });
        });
        setTeams(teams);
      } catch (error) {}
    };
    fetchTeams();
  }, []);

  async function createNewTeam(newTeam) {
    //setActiveClassName(!activeClassName);
    const docRef = await addDoc(collection(db, 'teams'), newTeam);
    newTeam.id = docRef.id;
    setTeams([...teams, newTeam]);
  }
  

  return (
    <ApplicationProvider value={{teams, createNewTeam,}}>
      <Header />
      <LoginHeader />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/raspored" element={<RasporedPage />} />
        <Route path="/rezultati" element={<RezultatiPage />} />
        <Route path="/tabela" element={<TabelaPage />} />
        <Route path="/timovi" element={<TimoviPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/onama" element={<ONamaPage />} />
        <Route path="/kontakt" element={<KontaktPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Footer />
    </ApplicationProvider>
  );
}

export default App;
