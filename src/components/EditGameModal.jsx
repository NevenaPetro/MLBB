import React from "react";
import { useState, useContext } from "react";
import { applicationContext } from "../context/AplicationContext";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Stack, TextField } from "@mui/material";
import moment from "moment";

function EditGameModal({item}) {
  const {
    locations,
    teams,
    seasons,
    setEditGameModalData,
    updateGame,
    
  } = useContext(applicationContext);
  const [updatedTeam1, setUpdatedTeam1] = useState(item.team1);
  const [updatedTeam2, setUpdatedTeam2] = useState(item.team2);
  const [updatedSeason, setUpdatedSeason] = useState(item.season);
  const [updatedLocation, setUpdatedLocation] = useState(item.location);
  const [updatedDate, setUpdatedDate] = useState(item.date);
  const [updatedTeam1Score, setUpdatedTeam1Score] = useState(item.scoreTeam1);
  const [updatedTeam2Score, setUpdatedTeam2Score] = useState(item.scoreTeam2);
  const [updatedTeam1Presence, setUpdatedTeam1Presence] = useState(
    item.presenceTeam1
  );
  const [updatedTeam2Presence, setUpdatedTeam2Presence] = useState(
    item.presenceTeam2
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const updatedGame = {
      id: item.id,
      date: updatedDate,
      location: updatedLocation,
      season: updatedSeason,
      played: item.played,
      team1: updatedTeam1,
      team2: updatedTeam2,
      scoreTeam1: +updatedTeam1Score,
      scoreTeam2: +updatedTeam2Score,
      presenceTeam1: updatedTeam1Presence,
      presenceTeam2: updatedTeam2Presence,
    };
    updateGame(updatedGame);
    setEditGameModalData(null);
  };
  const handleLocationInput = (e) => {
    e.target.value && setUpdatedLocation(e.target.value);
  };
  const handleTeam1Input = (e) => {
    e.target.value && setUpdatedTeam1(e.target.value);
  };
  const handleTeam2Input = (e) => {
    e.target.value && setUpdatedTeam2(e.target.value);
  };
  const handleSeasonInput = (e) => {
    e.target.value && setUpdatedSeason(e.target.value);
  };
  const handleUpdatedTeam1ScoreChange = (e) => {
    e.target.value && setUpdatedTeam1Score(e.target.value);
  };
  const handleUpdatedTeam2ScoreChange = (e) => {
    e.target.value && setUpdatedTeam2Score(e.target.value);
  };
  const handleUpdatedTeam1PresenceChange = (e) => {
    setUpdatedTeam1Presence(!updatedTeam1Presence);
  };
  const handleUpdatedTeam2PresenceChange = (e) => {
    setUpdatedTeam2Presence(!updatedTeam2Presence);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <p>Datum i vreme:</p>
        <Stack>
          <DateTimePicker
            renderInput={(params) => <TextField {...params} />}
            defaultValue={moment(updatedDate)}
            onChange={(newValue) => {
              setUpdatedDate(newValue.toDate());
            }}
          />
        </Stack>
        <label htmlFor="location">Lokacija:</label>
        <select
          defaultValue={updatedLocation}
          name="location"
          onChange={handleLocationInput}
        >
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
          defaultValue={updatedTeam1}
          name="team1"
          onChange={handleTeam1Input}
        >
          {teams.map((e) => {
            return (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            );
          })}
        </select>
        {item.played && (
          <>
            <label htmlFor="team1score">
              <input
                type="number"
                name="team1score"
                defaultValue={updatedTeam1Score}
                onChange={handleUpdatedTeam1ScoreChange}
              />
            </label>
            <label htmlFor="attended1">
              <input
                type="checkbox"
                name="attended1"
                checked={updatedTeam1Presence}
                onChange={handleUpdatedTeam1PresenceChange}
              />
            </label>
            <span> : </span>
            <label htmlFor="attended2">
              <input
                type="checkbox"
                name="attended2"
                checked={updatedTeam2Presence}
                onChange={handleUpdatedTeam2PresenceChange}
              />
            </label>
            <label htmlFor="team2score">
              <input
                type="number"
                name="team2score"
                defaultValue={updatedTeam2Score}
                onChange={handleUpdatedTeam2ScoreChange}
              />
            </label>
          </>
        )}
        <select
          defaultValue={updatedTeam2}
          name="team2"
          onChange={handleTeam2Input}
        >
          {teams.map((e) => {
            return (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            );
          })}
        </select>
        <label htmlFor="team2">:Tim 2</label>
        <br />
        <label htmlFor="season">Sezona:</label>
        <select
          name="season"
          defaultValue={updatedSeason}
          onChange={handleSeasonInput}
        >
          {seasons.map((e) => {
            return (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            );
          })}
        </select>
        <br />
        <button className="btn-md" type="submit">
          OK
        </button>
      </form>
    </>
  );
}

export default EditGameModal;

