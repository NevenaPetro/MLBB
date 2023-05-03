import React from "react";
import { useContext } from "react";
import { applicationContext } from "../context/AplicationContext";


function DeleteTeamModal({ item }) {
  const { setDeleteTeamModalData, deleteTeam } = useContext(applicationContext);
  return (
    <>
      <button
        className="btn-md"
        type="button"
        onClick={() => {
            deleteTeam(item);
            setDeleteTeamModalData(null);
        }}
      >
        Obriši
      </button>
  
    </>
  );
}

export default DeleteTeamModal;
