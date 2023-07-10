import React from "react";
import { useContext } from "react";
import { applicationContext } from "../context/AplicationContext";
import '../components/Modal/_modal.scss';

function DeleteTeamModal({ item }) {
  const { setDeleteTeamModalData, deleteTeam } = useContext(applicationContext);
  return (
    <div className="big-buttons modal-form">
      <p>Želiš da obrišeš ovaj tim?</p>
      <button
        className="big-btn"
        type="button"
        onClick={() => {
            deleteTeam(item);
            setDeleteTeamModalData(null);
        }}
      >
        Obriši
      </button>
  
    </div>
  );
}

export default DeleteTeamModal;
