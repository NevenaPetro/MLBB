import React from "react";
import { useState, useContext } from "react";
import { applicationContext } from "../../src/context/AplicationContext";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Stack, TextField } from "@mui/material";
import moment from "moment";
import "../components/Modal/_modal.scss";

function CreateGameModal() {
  const {
    teams,
    locations,
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
    setCreateGameModalData,
  } = useContext(applicationContext);
  const onSubmit = (e) => {
    e.preventDefault();
    const newGame = {
      date: gameDate,
      location: gameLocation,
      played: false,
      season: gameSeason,
      team1: gameTeam1,
      team2: gameTeam2,
      scoreTeam1: 0,
      scoreTeam2: 0,
      presenceTeam1: false,
      presenceTeam2: false,
    };
    createNewGame(newGame);
    setCreateGameModalData(null);

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
    <>
      <form className="modal-form" onSubmit={onSubmit}>
        <p>Datum i vreme:</p>
        <Stack>
          <DateTimePicker
            renderInput={(params) => <TextField {...params} />}
            defaultValue={moment(gameDate)}
            onChange={(newValue) => {
              setGameDate(newValue.toDate());
            }}
          />
        </Stack>
        <label htmlFor="location">Lokacija:</label>
        <select
          defaultValue={""}
          required
          id="location"
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
          id="team1"
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
          id="team2"
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
        <select
          defaultValue={""}
          required
          id="season"
          onChange={handleSeasonInput}
        >
          <option value="" disabled hidden>
            Odaberi...
          </option>
          {seasons.map((e) => {
            return (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            );
          })}
        </select>
        <br />
        <div className="big-buttons"></div>
        <button className="big-btn" type="submit">
          Kreiraj
        </button>
      </form>
    </>
  );
}

export default CreateGameModal;
