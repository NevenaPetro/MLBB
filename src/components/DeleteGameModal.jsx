import React from "react";
import { useState, useContext } from "react";
import { applicationContext } from "../context/AplicationContext";
import "../components/deleteGameModal.css";

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
        Delete?
      </button>
      <button
        className="btn-md"
        type="button"
        onClick={() => {
          setDeleteGameModalData(null);
        }}
      >
        Cancel
      </button>
    </>
  );
}

export default DeleteGameModal;
