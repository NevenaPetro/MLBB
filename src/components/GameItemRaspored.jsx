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
          <div>
            <p>{getTeamById(item.team1)} </p>
          </div>

          <span> &nbsp; : &nbsp; </span>
          <div>
            <p> {getTeamById(item.team2)}</p>
          </div>
        </div>
        <div className="game-info-raspored">
          <div>
            <span>Datum i vreme: </span>
            <span className="date-time">
              <Moment className="date-time" format="L LT">
                {item.date}
              </Moment>
              h
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
          <div className="big-buttons">
            <button
              className="big-btn"
              onClick={() => {
                setDeleteGameModalData(item);
              }}
            >
              Obriši
            </button>
            <button
              className="big-btn"
              onClick={() => {
                setEditGameModalData(item);
              }}
            >
              Izmeni
            </button>
            {!item.played && (
              <button
                className="big-btn"
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
