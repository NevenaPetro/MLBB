import React, { useState, useContext } from "react";
import { applicationContext } from "../../src/context/AplicationContext";

function FinishGameModal({ item }) {
  const {
    locations,
    teams,
    seasons,
    setFinishGameModalData,
    updateGame,
    setGameDate,
    getLocationById,
    getTeamById,
    getSeasonById,
    setGameLocation,
    setgameTeam1,
    setgameTeam2,
    setGameSeason,
  } = useContext(applicationContext);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const onSubmit = (e) => {
    e.preventDefault();
    const updatedGame = {
      id: item.id,
      date: item.date,
      location: item.location,
      played: item.played,
      season: item.season,
      team1: item.team1,
      team2: item.team2,
      scoreteam1: team1Score,
      scoreteam2: team2Score,
    };
    updateGame(updatedGame);
    setFinishGameModalData(null);
  };
  
  return (
    <>
      <div
        className="modal-bg"
        onClick={() => {
          setFinishGameModalData(null);
        }}
      >
        <div
          className="modal"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <button
            className={"close-btn"}
            type={"button"}
            onClick={() => setFinishGameModalData(null)}
          >
            X
          </button>
          <form onSubmit={onSubmit}>
            <label htmlFor="team1">{getTeamById(item.team1)}</label>
            <input type="number" name='team1'/>
            <input type="number" name='team2'/>
            <label htmlFor="team2">{getTeamById(item.team2)}</label>
            <br />
            <button className="btn-md" type="submit">
                OK
              </button>
          </form>
          <button
            className="btn-md"
            type="button"
            onClick={() => {
              setFinishGameModalData(null);
            }}
          >
            Odustani
          </button>
        </div>
      </div>
    </>
  );
}

export default FinishGameModal;
