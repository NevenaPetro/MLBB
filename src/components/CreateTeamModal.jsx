import React from "react";
import { useState, useContext } from "react";
import { applicationContext } from "../../src/context/AplicationContext";

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
      <form onSubmit={onSubmit}>
        <p>Ime:</p>
        <label htmlFor="createTeamName">
          <input
            type="text"
            name="createTeamName"
            defaultValue={teamName}
            onChange={handleCreatedTeamName}
          />
        </label>

        <button type="submit">Kreiraj</button>
      </form>
    </>
  );
}

export default CreateTeamModal;
