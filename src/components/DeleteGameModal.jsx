import React from "react";
import { useState, useContext } from "react";
import { applicationContext } from "../context/AplicationContext";
import "../components/deleteGameModal.css";

function DeteleGameModal({ item }) {
  const { setDeleteGameModalData, deleteGame } = useContext(applicationContext);
  return (
    <div>
      <>
        <div
          className="modal-bg"
          onClick={() => {
            setDeleteGameModalData(null);
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
              onClick={() => setDeleteGameModalData(null)}
            >
              X
            </button>

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
          </div>
        </div>
      </>
    </div>
  );
}

export default DeteleGameModal;

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
