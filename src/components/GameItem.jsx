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
    getLocationById,
    getTeamById,
    getSeasonById,
    setDeleteGameModalData,
    setEditGameModalData,
    setFinishGameModalData
  } = useContext(applicationContext);
  return (
    <>
      <>
        <span>
          <b>Datum i vreme:</b> <Moment format="L LT">{item.date}</Moment>h
        </span>
        <span>
          <b> Lokacija:</b> {getLocationById(item.location)}
        </span>
        <span>
          <b> Sezona:</b> {getSeasonById(item.season)}
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
            <button onClick={() => {
                setFinishGameModalData(item);
              }}>Završi utakmicu</button>
          </>
        )}
        <br />
        <br />
      </>
    </>
  );
}

export default GameItem;
