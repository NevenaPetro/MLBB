import React from "react";
import { useState, useContext } from "react";
import { applicationContext } from "../../src/context/AplicationContext";
import "../components/Modal/_modal.scss";

function CreateTeamModal() {
  const { createNewTeam, setCreateTeamModalData } =
    useContext(applicationContext);

  const [teamName, setTeamName] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const newTeam = {
      name: teamName,
    };
    createNewTeam(newTeam);
    setCreateTeamModalData(null);

    //setActiveClassNameTask(!activeClassNameTask);
  };
  const handleCreatedTeamName = (e) => {
    setTeamName(e.target.value);
  };

  return (
    <>
      <form className="modal-form" onSubmit={onSubmit}>
        <p>Ime:</p>
        <label htmlFor="createTeamName">
          <input
            className="input-style"
            type="text"
            id="createTeamName"
            defaultValue={teamName}
            onChange={handleCreatedTeamName}
          />
        </label>
        <div className="big-buttons">
          <button className="big-btn" type="submit">
            Kreiraj
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateTeamModal;
