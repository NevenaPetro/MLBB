import React from "react";
import Moment from "react-moment";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useState, useContext } from "react";
import { applicationContext } from "../../src/context/AplicationContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment";
import "moment/locale/sr";

function GameItem({ item }) {
  moment.locale("sr");
  const { loggedIn, checkingStatus } = useAuthStatus();
  const {
    teams,
    locations,
    getLocationById,
    getTeamById,
    gameDate,
    gameLocation,
    gameTeam1,
    gameTeam2,
    gameSeason,
    setGameDate,
    setGameLocation,
    setgameTeam1,
    setgameTeam2,
    setGameSeason,
    setDeleteGameModalData,
    setEditGameModalData
  } = useContext(applicationContext);

  
  const handleLocationInput = (e) => {
    setGameLocation(e.target.value);
  };
  const handleTeam1Input = (e) => {
    setgameTeam1(e.target.value);
  };
  const handleTeam2Input = (e) => {
    setgameTeam2(e.target.value);
  };
  const handleSeasonInput = (e) => {
    setGameSeason(e.target.value);
  };
  return (
    <>
      <>
        <span>
          <b>Datum:</b> <Moment format="LLLL">{item.date}</Moment>h
        </span>
        <span>
          <b> Lokacija:</b> {getLocationById(item.location)}
        </span>
        <br />
        <span>{getTeamById(item.team1)}</span>
        <span> : </span>
        <span>{getTeamById(item.team2)}</span>
        <br />
        {loggedIn && (
          <>
            <button
              onClick={() => {
                setDeleteGameModalData(item);
              }}
            >
              Obriši
            </button>
            <button
              onClick={() => {
                setEditGameModalData(item);
              }}
            >
              Izmeni
            </button>
            <button>Završi utakmicu</button>
          </>
        )}
        <br />
        <br />
      </>
    </>
  );
}

export default GameItem;
