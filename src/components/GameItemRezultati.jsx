import React from "react";
import Moment from "react-moment";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useContext } from "react";
import { applicationContext } from "../context/AplicationContext";

import moment from "moment";
import "moment/locale/sr";

function GameItem({ item }) {
  moment.locale("sr");
  const { loggedIn } = useAuthStatus();
  const {
    getLocationById,
    getTeamById,
    setDeleteGameModalData,
    setEditGameModalData,
    setFinishGameModalData,
  } = useContext(applicationContext);
  return (
    <>
      <>
        <div className="team-results">
          <div>
            <p className="team-name">{getTeamById(item.team1)} </p>
          </div>
          <span> &nbsp; : &nbsp; </span>
          <div>
            <p className="team-name"> {getTeamById(item.team2)}</p>
          </div>
        </div>
        <div className="team-results">
          <div>
            {item.played && <p className="team-scores">{item.scoreTeam1}</p>}
          </div>
          <div>
            {item.played && <p className="team-scores">{item.scoreTeam2}</p>}
          </div>
        </div>
        <div className="game-info-rezultati">
          <span> {getLocationById(item.location)}, &nbsp;</span>
          
            <Moment format="L ">{item.date}</Moment>
          
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
