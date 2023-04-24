import React from "react";
import { useState, useContext } from "react";
import { applicationContext } from "../context/AplicationContext";
import DatePickerSchedule from "../components/DatePickerSchedule";
import "../components/deleteGameModal.css";

function EditGameModal({ item }) {
  const {
    locations,
    teams,
    seasons,
    setEditGameModalData,
    updateGame,
    gameDate,
    setGameDate,
    setGameLocation,
    setgameTeam1,
    setgameTeam2,
    setGameSeason,
  } = useContext(applicationContext);
  const [updatedTeam1, setUpdatedTeam1] = useState(item.team1);
  const [updatedTeam2, setUpdatedTeam2] = useState(item.team2);
  const [updatedSeason, setUpdatedSeason] = useState(+item.season);
  const [updatedLocation, setUpdatedLocation] = useState(item.location);
  const [updatedDate, setUpdatedDate] = useState(item.date);
  const [updatedPlayed, setUpdatedPlayed] = useState(item.played);
  
  const onSubmit = (e) => {
    console.log(updatedSeason, item.season)
    e.preventDefault();
    const updatedGame = {
      id: item.id,
      date: updatedDate,
      location: updatedLocation,
      played: updatedPlayed,
      season: updatedSeason,
      team1: updatedTeam1,
      team2: updatedTeam2,
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
    e.target.value && setUpdatedSeason(+e.target.value);
  };

  return (
    <div>
      <>
        <div
          className="modal-bg"
          onClick={() => {
            setEditGameModalData(null);
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
              onClick={() => setEditGameModalData(null)}
            >
              X
            </button>
            <form onSubmit={onSubmit}>
              <p>Datum i vreme:</p>
              <DatePickerSchedule
                startDate={gameDate}
                setStartDate={setGameDate}
              />
              <label htmlFor="location">Lokacija:</label>
              <select
                defaultValue={""}
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
              <select  name="season" onChange={handleSeasonInput}>
                {seasons.map((e) => {
                  return (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
              <button className="btn-md" type="submit">
                Update
              </button>
            </form>

            <button
              className="btn-md"
              type="button"
              onClick={() => {
                setEditGameModalData(null);
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

export default EditGameModal;

/*function EmplModal({ item }) {
  const { setEmplModalData, updateEmployee } = useContext(applicationContext);
  

  function changeEmployee(e) {
    e.preventDefault();
    const updatedEmployee = {
      id: item.id,
      name: newName,
      email: newEmail,
      phone: newPhone,
      dateOfBirth: newDateOfBirth,
      salary: newSalary,
    };
    updateEmployee(updatedEmployee);
    setEmplModalData(null);
  }*/
