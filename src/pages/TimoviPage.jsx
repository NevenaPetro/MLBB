import React from "react";
import { useState, useContext } from "react";
import { applicationContext } from "../../src/context/AplicationContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useAuthStatus } from "../../src/hooks/useAuthStatus";

function TimoviPage() {
  const {
    teams,
    createNewTeam,
    updateTeam,
    setCreateTeamModalData,
    setEditTeamModalData,
    setDeleteTeamModalData,
  } = useContext(applicationContext);
  const { loggedIn, checkingStatus } = useAuthStatus();

  return (
    <div>
      <h2>Timovi</h2>
      {loggedIn && (
        <button
          onClick={() => {
            setCreateTeamModalData(1);
          }}
        >
          Kreiraj novi tim
        </button>
      )}
      <ul>
        {teams &&
          teams.map((e) => (
            <li key={e.id}>
              <span>{e.name}</span>
              {loggedIn && (
                <>
                  <button
                    onClick={() => {
                      setEditTeamModalData(e);
                    }}
                  >
                    Izmeni
                  </button>
                  <button
                    onClick={() => {
                      setDeleteTeamModalData(e);
                    }}
                  >
                    Izbriši
                  </button>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TimoviPage;
