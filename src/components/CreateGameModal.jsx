import React from "react";
import { useState, useContext } from "react";
import { applicationContext } from "../../src/context/AplicationContext";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Stack, TextField } from "@mui/material";
import { Timestamp } from "@firebase/firestore";

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
  console.log(gameDate)
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
    setCreateGameModalData(null);
    console.log(gameDate)
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
      <>
        <div
          className="modal-bg"
          onClick={() => {
            setCreateGameModalData(null);
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
              onClick={() => setCreateGameModalData(null)}
            >
              X
            </button>

            <form onSubmit={onSubmit}>
              <p>Datum i vreme:</p>
              <Stack>
                <DateTimePicker
                  label="Date Time Picker"
                  renderInput={(params) => <TextField {...params} />}
                  value={gameDate}
                  onChange={(newValue) => {
                    setGameDate(newValue);
                  }}
                />
              </Stack>
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
              <select
                defaultValue={""}
                required
                name="season"
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
              <button type="submit">Kreiraj</button>
            </form>
            <button
              className="btn-md"
              type="button"
              onClick={() => {
                setCreateGameModalData(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </>
    </div>
  );
}

export default CreateGameModal;
