import React from "react";
import { useState, useContext } from "react";
import { applicationContext } from "../context/AplicationContext";
import '../components/Modal/_modal.scss';

function EditTeamModal({ item }) {
  const { setEditTeamModalData, updateTeam } = useContext(applicationContext);
  const [updatedTeamName, setUpdatedTeamName] = useState(item.name);

  const onSubmit = (e) => {
    e.preventDefault();
    const updatedTeam = {
      id: item.id,
      name: updatedTeamName,
    };
    updateTeam(updatedTeam);
    setEditTeamModalData(null);
  };

  const handleUpdatedTeamName = (e) => {
    e.target.value && setUpdatedTeamName(e.target.value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <p>Ime:</p>
        <label htmlFor="teamName">
          <input 
            type="text"
            name="teamName"
            defaultValue={updatedTeamName}
            onChange={handleUpdatedTeamName}
          />
        </label>
        <button className="btn-md" type="submit">
          OK
        </button>
      </form>
    </>
  );
}

export default EditTeamModal;
