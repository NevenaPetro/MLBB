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
  const [games, setGames] = useState([]);
  const [seasons, setSeasons] = useState([]);


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

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const q = query(collection(db, 'locations'));
        const querySnap = await getDocs(q);
        const locations = [];

        querySnap.forEach((doc) => {
          return locations.push({
            id: doc.id,
            name: doc.data().name,
          });
        });
        setLocations(locations);
      } catch (error) {}
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const q = query(collection(db, 'games'));
        const querySnap = await getDocs(q);
        const games = [];
        querySnap.forEach((doc) => {
          return games.push({
            id: doc.id,
            date: doc.data().date.toDate(),
            team1: doc.data().team1,
            team2: doc.data().team2,
            location: doc.data().location,
            played: doc.data().played,
          });
        });
        setGames(games);
      } catch (error) {}
    };
    fetchGames();
  }, []);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const q = query(collection(db, 'seasons'));
        const querySnap = await getDocs(q);
        const seasons = [];

        querySnap.forEach((doc) => {
          return seasons.push({
            id: doc.id,
            name: doc.data().name,
          });
        });
        setSeasons(seasons);
      } catch (error) {}
    };
    fetchSeasons();
  }, []);

  async function createNewTeam(newTeam) {
    //setActiveClassName(!activeClassName);
    const docRef = await addDoc(collection(db, 'teams'), newTeam);
    newTeam.id = docRef.id;
    setTeams([...teams, newTeam]);
  }

  async function createNewGame(newGame) {
    //setActiveClassName(!activeClassName);
    const docRef = await addDoc(collection(db, 'games'), newGame);
    newGame.id = docRef.id;
    setGames([...games, newGame]);
  }

  function getLocationById(id) {
    let location = locations.find((e) => e.id === id);
    return location ? location.name : 'deleted location';
  }

  function getTeamById(id) {
    let team = teams.find((e) => e.id === id);
    return team ? team.name : 'deleted team';
  }

  return (
    <ApplicationProvider value={{teams, games, createNewTeam, locations, createNewGame, getLocationById, getTeamById, seasons}}>
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
