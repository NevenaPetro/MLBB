import React, { useState, useEffect } from "react";
import { ApplicationProvider } from "./context/AplicationContext";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";

import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import LoginHeader from "./components/LoginHeader/LoginHeader";
import DeleteGameModal from "./components/DeleteGameModal";
import EditGameModal from "./components/EditGameModal";
import CreateGameModal from "../src/components/CreateGameModal";
import FinishGameModal from "../src/components/FinishGameModal";
import Modal from "./components/Modal/Modal";
import EditTeamModal from "./components/EditTeamModal";
import CreateTeamModal from "./components/CreateTeamModal";
import DeletTeamModal from './components/DeleteTeamModal'
import {
  collection,
  getDocs,
  addDoc,
  query,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/sr";
import './app.scss';

function App() {
  const [teams, setTeams] = useState([]);
  const [locations, setLocations] = useState([]);
  const [games, setGames] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [gameDate, setGameDate] = useState(new Date());
  const [gameLocation, setGameLocation] = useState("");
  const [gameTeam1, setgameTeam1] = useState("");
  const [gameTeam2, setgameTeam2] = useState("");
  const [gameSeason, setGameSeason] = useState("");
  const [deleteGameModalData, setDeleteGameModalData] = useState(null);
  const [editGameModalData, setEditGameModalData] = useState(null);
  const [createGameModalData, setCreateGameModalData] = useState(null);
  const [finishGameModalData, setFinishGameModalData] = useState(null);
  const [editTeamModalData, setEditTeamModalData] = useState(null);
  const [createTeamModalData, setCreateTeamModalData] = useState(null);
  const [deleteTeamModalData, setDeleteTeamModalData] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const q = query(collection(db, "teams"));
        const querySnap = await getDocs(q);
        const teams = [];

        querySnap.forEach((doc) => {
          return teams.push({
            id: doc.id,
            name: doc.data().name,
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
        const q = query(collection(db, "locations"));
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
        const q = query(collection(db, "games"));
        const querySnap = await getDocs(q);
        const games = [];
        querySnap.forEach((doc) => {
          return games.push({
            id: doc.id,
            date: doc.data().date.toDate(),
            location: doc.data().location,
            season: doc.data().season,
            played: doc.data().played,
            team1: doc.data().team1,
            team2: doc.data().team2,
            scoreTeam1: doc.data().scoreTeam1,
            scoreTeam2: doc.data().scoreTeam2,
            presenceTeam1: doc.data().presenceTeam1,
            presenceTeam2: doc.data().presenceTeam2,
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
        const q = query(collection(db, "seasons"));
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
    const docRef = await addDoc(collection(db, "teams"), newTeam);
    newTeam.id = docRef.id;
    setTeams([...teams, newTeam]);
  }

  async function createNewGame(newGame) {
    //setActiveClassName(!activeClassName);
    const docRef = await addDoc(collection(db, "games"), newGame);
    newGame.id = docRef.id;
    setGames([...games, newGame]);
  }

  function updateGame(item) {
    let differenceList = games.filter((e) => e.id !== item.id);
    let newGame = [...differenceList, item];
    setGames(newGame);
    updateDoc(doc(db, "games", item.id), {
      date: item.date,
      location: item.location,
      played: item.played,
      season: item.season,
      team1: item.team1,
      team2: item.team2,
      scoreTeam1: item.scoreTeam1,
      scoreTeam2: item.scoreTeam2,
      presenceTeam1: item.presenceTeam1,
      presenceTeam2: item.presenceTeam2,
    });
  }
  function updateTeam(item) {
    let differenceList = teams.filter((e) => e.id !== item.id);
    let newTeam = [...differenceList, item];
    setTeams(newTeam);
    updateDoc(doc(db, "teams", item.id), {
      name: item.name,
    });
  }

  function deleteGame(item) {
    setGames(games.filter((e) => e.id !== item.id));
    deleteDoc(doc(db, "games", item.id));
  }
  function deleteTeam(item) {
    setTeams(teams.filter((e) => e.id !== item.id));
    deleteDoc(doc(db, "teams", item.id));
  }

  function getLocationById(id) {
    let location = locations.find((e) => e.id === id);
    return location ? location.name : "deleted location";
  }

  function getTeamById(id) {
    let team = teams.find((e) => e.id === id);
    return team ? team.name : "deleted team";
  }

  function getSeasonById(id) {
    let season = seasons.find((e) => e.id === id);
    return season ? season.name : "deleted season";
  }

  return (
    <ApplicationProvider
      value={{
        teams,
        games,
        seasons,
        locations,
        gameDate,
        gameLocation,
        gameTeam1,
        gameTeam2,
        gameSeason,
        createNewTeam,
        createNewGame,
        getLocationById,
        getTeamById,
        getSeasonById,
        deleteGame,
        setGameDate,
        setGameLocation,
        setgameTeam1,
        setgameTeam2,
        setGameSeason,
        setDeleteGameModalData,
        setEditGameModalData,
        setCreateGameModalData,
        setFinishGameModalData,
        setEditTeamModalData,
        setCreateTeamModalData,
        setDeleteTeamModalData,
        updateGame,
        updateTeam,
        deleteTeam,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="sr">
        <Header />
        <LoginHeader />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          
        </Routes>

        {deleteGameModalData && (
          <Modal
            setModalData={setDeleteGameModalData}
            children={<DeleteGameModal item={deleteGameModalData} />}
          />
        )}
        {editGameModalData && (
          <Modal
            setModalData={setEditGameModalData}
            children={<EditGameModal item={editGameModalData} />}
          />
        )}
        {createGameModalData && (
          <Modal
            setModalData={setCreateGameModalData}
            children={<CreateGameModal item={1} />}
          />
        )}
        {finishGameModalData && (
          <Modal
            setModalData={setFinishGameModalData}
            children={<FinishGameModal item={finishGameModalData} />}
          />
        )}
        {createTeamModalData && (
          <Modal
            setModalData={setCreateTeamModalData}
            children={<CreateTeamModal item={1} />}
          />
        )}
        {editTeamModalData && (
          <Modal
            setModalData={setEditTeamModalData}
            children={<EditTeamModal item={editTeamModalData} />}
          />
        )}
        {deleteTeamModalData && (
          <Modal
            setModalData={setDeleteTeamModalData}
            children={<DeletTeamModal item={deleteTeamModalData} />}
          />
        )}

        <Footer />
      </LocalizationProvider>
    </ApplicationProvider>
  );
}

export default App;
