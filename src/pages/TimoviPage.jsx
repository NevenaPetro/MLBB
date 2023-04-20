import React from "react";
import { useState, useContext } from "react";
import { applicationContext } from "../../src/context/AplicationContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useAuthStatus } from "../../src/hooks/useAuthStatus";

function TimoviPage() {
  const { teams, createNewTeam } = useContext(applicationContext);
  const { loggedIn, checkingStatus } = useAuthStatus();
  
  return (
    <div>
      <h2>Timovi</h2>
      {loggedIn && <AddCircleIcon onClick={createNewTeam} />}
      <ul>
        {" "}
        {teams &&
          teams.map((e) => (
            <li key={e.id}>
              <span>{e.name}</span>
              {loggedIn && (
                <>
                  <span>
                    <DeleteForeverIcon />
                  </span>
                  <span>
                    <BorderColorIcon />
                  </span>{" "}
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TimoviPage;
