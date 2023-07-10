import React, { useState, useContext } from "react";
import { applicationContext } from "../../src/context/AplicationContext";

import "../components/Modal/_modal.scss";
function FinishGameModal({ item }) {
  const { setFinishGameModalData, updateGame, getTeamById } =
    useContext(applicationContext);

  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [team1Attended, setTeam1Attended] = useState(true);
  const [team2Attended, setTeam2Attended] = useState(true);

  /*if (team1Attended && team2Attended) {
    if (team1Score > team2Score) {
      pointsTeam1 = 2;
      pointsTeam2 = 1;
    } else {
      pointsTeam1 = 1;
      pointsTeam2 = 2;
    }
  } else {
    if (team1Attended) {
      pointsTeam1 = 2;
      pointsTeam2 = 0;
    } else {
      pointsTeam1 = 0;
      pointsTeam2 = 2;
    }
  }*/

  const onSubmit = (e) => {
    e.preventDefault();
    const updatedGame = {
      id: item.id,
      date: item.date,
      location: item.location,
      played: true,
      season: item.season,
      team1: item.team1,
      team2: item.team2,
      scoreTeam1: team1Score,
      scoreTeam2: team2Score,
      presenceTeam1: team1Attended,
      presenceTeam2: team2Attended,
    };
    updateGame(updatedGame);
    setFinishGameModalData(null);
  };

  const handleChange1 = () => {
    setTeam1Attended(!team1Attended);
  };
  const handleChange2 = () => {
    setTeam2Attended(!team2Attended);
  };
  const handleTeam1ScoreChange = (e) => {
    e.target.value && setTeam1Score(+e.target.value);
    console.log(typeof team1Score);
  };
  const handleTeam2ScoreChange = (e) => {
    e.target.value && setTeam2Score(+e.target.value);
  };

  return (
    <>
      <form className="modal-form" onSubmit={onSubmit}>
        <p>Tim 1:</p>
        <label htmlFor="team1">{getTeamById(item.team1)}</label>
        <label htmlFor="attended1" className="score-wrapper">
          <span>Prisustvovali?</span>
          <input
            type="checkbox"
            id="attended1"
            checked={team1Attended}
            onChange={handleChange1}
          />
        </label>
        <input
          className="input-style"
          type="number"
          id="team1"
          onChange={handleTeam1ScoreChange}
          placeholder="upiši rezultat 1"
        />
        <br /> <br />
        <p>Tim 2:</p>
        <label htmlFor="team2">{getTeamById(item.team2)}</label>
        <label htmlFor="attended2" className="score-wrapper">
          <span>Prisustvovali?</span>
          <input
            type="checkbox"
            id="attended2"
            checked={team2Attended}
            onChange={handleChange2}
          />
        </label>
        <input
          className="input-style"
          type="number"
          id="team2"
          onChange={handleTeam2ScoreChange}
          placeholder="upiši rezultat 2"
        />{" "}
        <br />
        <br />
        <div className="big-buttons">
          <button className="big-btn" type="submit">
            Snimi rezultat
          </button>
        </div>
      </form>
    </>
  );
}

export default FinishGameModal;
