import React from "react";
import { useState, useContext } from "react";
import { applicationContext } from "../../src/context/AplicationContext";
import { useAuthStatus } from "../hooks/useAuthStatus";
import DatePickerSchedule from "../components/DatePickerSchedule";
import GameItem from "../components/GameItem";

function RasporedPage() {
  const {
    teams,
    locations,
    games,
    createNewGame,
    seasons,
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
  } = useContext(applicationContext);
  const { loggedIn, checkingStatus } = useAuthStatus();

  const onSubmit = (e) => {
    e.preventDefault();
    const newGame = {
      date: gameDate,
      team1: gameTeam1,
      team2: gameTeam2,
      location: gameLocation,
      played: false,
      season: gameSeason,
    };
    createNewGame(newGame);
    //setActiveClassNameTask(!activeClassNameTask);
  };

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
    <div>
      <h2>Raspored</h2>
      <ul>
        {games &&
          games.map(
            (e) =>
              !e.played && (
                <li key={e.id}>
                  <GameItem item={e}></GameItem>
                </li>
              )
          )}
      </ul>
      {loggedIn && (
        <>
          <p>
            <b>Kreiraj novu utakmicu:</b>
          </p>
          <form onSubmit={onSubmit}>
            <p>Datum i vreme:</p>
            <DatePickerSchedule
              startDate={gameDate}
              setStartDate={setGameDate}
            />
            <label htmlFor="location">Lokacija:</label>
            <select
              defaultValue={""}
              required
              name="location"
              onChange={handleLocationInput}
            >
              <option value="" disabled hidden>
                Odaberi...
              </option>
              {locations.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
            <br />
            <label htmlFor="team1">Tim 1:</label>
            <select
              defaultValue={""}
              required
              name="team1"
              onChange={handleTeam1Input}
            >
              <option value="" disabled hidden>
                Odaberi...
              </option>
              {teams.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
            <br />
            <label htmlFor="team2">Tim 2:</label>
            <select
              defaultValue={""}
              required
              name="team2"
              onChange={handleTeam2Input}
            >
              <option value="" disabled hidden>
                Odaberi...
              </option>
              {teams.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
            <label htmlFor="season">Sezona:</label>
            <select required name="season" onChange={handleSeasonInput}>
              {seasons.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
            <br />
            <button type="submit">Kreiraj</button>
          </form>
        </>
      )}
    </div>
  );
}

export default RasporedPage;
