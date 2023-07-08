import React from "react";
import { useState, useContext } from "react";
import { applicationContext } from "../context/AplicationContext";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Stack, TextField } from "@mui/material";
import moment from "moment";
import "../components/Modal/_modal.scss";

function EditGameModal({ item }) {
  const { locations, teams, seasons, setEditGameModalData, updateGame } =
    useContext(applicationContext);
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
      <form className="modal-form" onSubmit={onSubmit}>
        <label htmlFor="datepickern">
          Datum i vreme:
          <br />
          <Stack>
            <DateTimePicker
              id="datepickern"
              renderInput={(params) => <TextField {...params} />}
              defaultValue={moment(updatedDate)}
              onChange={(newValue) => {
                setUpdatedDate(newValue.toDate());
              }}
            />
          </Stack>
        </label>

        <label htmlFor="location">
          Lokacija:
          <br />
          <select
            defaultValue={updatedLocation}
            id="location"
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
        </label>
        <div className="score-wrapper">
          <div className="score-sub-wrapper">
            <label htmlFor="team1">
              Tim 1:
              <br />
              <select
                defaultValue={updatedTeam1}
                id="team1"
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
            </label>

            {item.played && (
              <>
                <div className="score-sub-sub-wrapper">
                  <label htmlFor="team1score">
                    <input
                      type="number"
                      id="team1score"
                      defaultValue={updatedTeam1Score}
                      onChange={handleUpdatedTeam1ScoreChange}
                    />
                  </label>
                  <label htmlFor="attended1">
                    <input
                      type="checkbox"
                      id="attended1"
                      checked={updatedTeam1Presence}
                      onChange={handleUpdatedTeam1PresenceChange}
                    />
                  </label>
                </div>
              </>
            )}
          </div>
          <span> : </span>
          <div className="score-sub-wrapper">
            <label htmlFor="team2">
              Tim 2:
              <br />
              <select
                defaultValue={updatedTeam2}
                id="team2"
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
            </label>
            {item.played && (
              <>
                <div className="score-sub-sub-wrapper">
                  {" "}
                  <label htmlFor="attended2">
                    <input
                      type="checkbox"
                      id="attended2"
                      checked={updatedTeam2Presence}
                      onChange={handleUpdatedTeam2PresenceChange}
                    />
                  </label>
                  <label htmlFor="team2score">
                    <input
                      type="number"
                      id="team2score"
                      defaultValue={updatedTeam2Score}
                      onChange={handleUpdatedTeam2ScoreChange}
                    />
                  </label>
                </div>
              </>
            )}
          </div>
        </div>
        <label htmlFor="season">
          Sezona:
          <br />
          <select
            id="season"
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
        </label>

        <div className="big-buttons">
          <button className="big-btn" type="submit">
            OK
          </button>
        </div>
      </form>
    </>
  );
}

export default EditGameModal;
