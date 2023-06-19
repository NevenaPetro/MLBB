import React from "react";
import Moment from "react-moment";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useContext } from "react";
import { applicationContext } from "../context/AplicationContext";
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
    setFinishGameModalData,
  } = useContext(applicationContext);
  return (
    <>
      <>
        <div className="team-names">
          <span>{getTeamById(item.team1)} </span>
          <span> &nbsp; : &nbsp; </span>
          <span> {getTeamById(item.team2)}</span>
        </div>
        <div className="game-info-raspored">
          <div>
            <span>Datum i vreme: </span>
            <span>
              <Moment format="L LT">{item.date}</Moment>h
            </span>
          </div>
          <div>
            <span>Lokacija: </span>
            <span> {getLocationById(item.location)}</span>
          </div>
          <div>
            <span>Sezona: </span>
            <span>{getSeasonById(item.season)}</span>
          </div>
        </div>

        {loggedIn && (
          <div className="game-buttons">
            <button
              className="big-buttons"
              onClick={() => {
                setDeleteGameModalData(item);
              }}
            >
              Obriši
            </button>
            <button
              className="big-buttons"
              onClick={() => {
                setEditGameModalData(item);
              }}
            >
              Izmeni
            </button>
            {!item.played && (
              <button
                className="big-buttons"
                onClick={() => {
                  setFinishGameModalData(item);
                }}
              >
                Rezultat
              </button>
            )}
          </div>
        )}
      </>
    </>
  );
}

export default GameItem;
