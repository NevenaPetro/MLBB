import React from "react";
import { useContext } from "react";
import { applicationContext } from "../context/AplicationContext";
import '../components/Modal/_modal.scss';

function DeleteGameModal({ item }) {
  const { setDeleteGameModalData, deleteGame } = useContext(applicationContext);
  return (
    <>
      <button
        className="btn-md"
        type="button"
        onClick={() => {
          deleteGame(item);
          setDeleteGameModalData(null);
        }}
      >
        Obriši
      </button>
  
    </>
  );
}

export default DeleteGameModal;
