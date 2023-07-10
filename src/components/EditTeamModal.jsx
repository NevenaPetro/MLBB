import React from "react";
import { useState, useContext } from "react";
import { applicationContext } from "../context/AplicationContext";
import "../components/Modal/_modal.scss";

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
      <form onSubmit={onSubmit} className="modal-form">
        <p>Izmeni ime tima:</p>
        <label htmlFor="teamName">
          <input
            className="input-style"
            type="text"
            id="teamName"
            defaultValue={updatedTeamName}
            onChange={handleUpdatedTeamName}
          />
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

export default EditTeamModal;
