import React from "react";
import { useState, useContext } from "react";
import { applicationContext } from "../../src/context/AplicationContext";
import { useAuthStatus } from "../hooks/useAuthStatus";
import DatePickerSchedule from "../components/DatePickerSchedule";
import GameItem from "../components/GameItem";

function RezultatiPage() {
  const { teams, locations, games, createNewGame } =
    useContext(applicationContext);
  const { loggedIn, checkingStatus } = useAuthStatus();
  const [gameDate, setGameDate] = useState(new Date());
  const [gameLocation, setGameLocation] = useState("");
  const [gameTeam1, setgameTeam1] = useState("");
  const [gameTeam2, setgameTeam2] = useState("");
  const [gamePlayed, setGamePlayed] = useState(false);
  return (
    <div>
      <h2>Rezultati Page</h2>
      <ul>
        {games &&
          games.map(
            (e) =>
              e.played && (
                <li key={e.id}>
                  <GameItem item={e}></GameItem>
                </li>
              )
          )}
      </ul>
    </div>
  );
}

export default RezultatiPage;
