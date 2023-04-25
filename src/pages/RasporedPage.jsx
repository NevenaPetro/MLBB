import React from "react";
import { useState, useContext } from "react";
import { applicationContext } from "../../src/context/AplicationContext";
import { useAuthStatus } from "../hooks/useAuthStatus";

import GameItem from "../components/GameItem";

function RasporedPage() {
  const { games, setCreateGameModalData } = useContext(applicationContext);
  const { loggedIn, checkingStatus } = useAuthStatus();

  return (
    <div>
      <h2>Raspored</h2>
      <ul>
        {games &&
          games.map(
            (e) =>
              !e.played && (
                <li key={e.id}>
                  <GameItem item={e}></GameItem>
                </li>
              )
          )}
      </ul>
      {loggedIn && (
        <>
          <button
            onClick={() => {
              setCreateGameModalData(1);
            }}
          >
            Kreiraj novu utakmicu:
          </button>
        </>
      )}
    </div>
  );
}

export default RasporedPage;
