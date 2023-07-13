import React from "react";
import { useContext } from "react";
import { applicationContext } from "../context/AplicationContext";
import '../components/Modal/_modal.scss';

function DeleteGameModal({ item }) {
  const { setDeleteGameModalData, deleteGame } = useContext(applicationContext);
  return (
    <div className="big-buttons modal-form">
      <p>Da li želiš da obrišeš utakmicu?</p>
      <br /> 
      <button
        className="big-btn"
        type="button"
        onClick={() => {
          deleteGame(item);
          setDeleteGameModalData(null);
        }}
      >
        Obriši
      </button>
  
    </div>
  );
}

export default DeleteGameModal;
