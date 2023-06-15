import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { applicationContext } from "../../src/context/AplicationContext";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useLocation } from "react-router-dom";
import GameItem from "../components/GameItem";
import TableItem from "../components/Table/TableItem";

function HomePage() {
  let data = useLocation();
  const {
    games,
    seasons,
    teams,
    locations,
    createNewGame,
    setCreateGameModalData,
    setCreateTeamModalData,
    setEditTeamModalData,
    setDeleteTeamModalData,
  } = useContext(applicationContext);
  const { loggedIn, checkingStatus } = useAuthStatus();
  const [selectedSeason, setSelectedSeason] = useState("");
  const [gameDate, setGameDate] = useState(new Date());
  const [gameLocation, setGameLocation] = useState("");
  const [gameTeam1, setgameTeam1] = useState("");
  const [gameTeam2, setgameTeam2] = useState("");
  const [gamePlayed, setGamePlayed] = useState(false);
  const handleSeasonSelect = (e) => {
    e.target.value && setSelectedSeason(e.target.value);
  };
  let finishedGames = games.filter((e) => e.played);
  let gamesInSeason = finishedGames.filter((e) => e.season == selectedSeason);
  let tableList = [];
  gamesInSeason.forEach((game) => {
    let existing1 = tableList.find((e) => e.teamId === game.team1);
    let existing2 = tableList.find((e) => e.teamId === game.team2);
    let teamWins;
    let teamLoses;
    let teamPoints;
    if (game.scoreTeam1 > game.scoreTeam2) {
      teamWins = 1;
      teamLoses = 0;
      teamPoints = 2;
    } else {
      if (game.presenceTeam1) {
        teamWins = 0;
        teamLoses = 1;
        teamPoints = 1;
      } else {
        teamWins = 0;
        teamLoses = 1;
        teamPoints = 0;
      }
    }
    if (existing1) {
      existing1.teamId = existing1.teamId;
      existing1.gamesPlayed += 1;
      existing1.wins = existing1.wins + teamWins;
      existing1.loses = existing1.loses + teamLoses;
      existing1.points = existing1.points + teamPoints;
      existing1.pointsReceived = existing1.pointsReceived + game.scoreTeam2;
      existing1.pointsScored = existing1.pointsScored + game.scoreTeam1;
      existing1.pointsDifference =
        existing1.pointsDifference + (game.scoreTeam1 - game.scoreTeam2);
    } else {
      tableList.push({
        teamId: game.team1,
        gamesPlayed: 1,
        wins: teamWins,
        loses: teamLoses,
        points: teamPoints,
        pointsReceived: +game.scoreTeam2,
        pointsScored: +game.scoreTeam1,
        pointsDifference: +(game.scoreTeam1 - game.scoreTeam2),
      });
    }
    if (game.scoreTeam2 > game.scoreTeam1) {
      teamWins = 1;
      teamLoses = 0;
      teamPoints = 2;
    } else {
      if (game.presenceTeam2) {
        teamWins = 0;
        teamLoses = 1;
        teamPoints = 1;
      } else {
        teamWins = 0;
        teamLoses = 1;
        teamPoints = 0;
      }
    }
    if (existing2) {
      existing2.teamId = existing2.teamId;
      existing2.gamesPlayed += 1;
      existing2.wins = existing2.wins + teamWins;
      existing2.loses = existing2.loses + teamLoses;
      existing2.points = existing2.points + teamPoints;
      existing2.pointsReceived = existing2.pointsReceived + game.scoreTeam1;
      existing2.pointsScored = existing2.pointsScored + game.scoreTeam2;
      existing2.pointsDifference =
        existing2.pointsDifference + (game.scoreTeam2 - game.scoreTeam1);
    } else {
      tableList.push({
        teamId: game.team2,
        gamesPlayed: 1,
        wins: teamWins,
        loses: teamLoses,
        points: teamPoints,
        pointsReceived: +game.scoreTeam1,
        pointsScored: +game.scoreTeam2,
        pointsDifference: +(game.scoreTeam2 - game.scoreTeam1),
      });
    }
  });
  tableList.sort((a, b) => b.points - a.points);
  useEffect(() => {
    let section = data.state ? data.state.section : null;
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  });

  return (
    <>
      <div id="homepage-wrapper">
        <h1>Mala liga bez briga</h1>
      </div>
      <section id="raspored">
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
      </section>
      <section id="rezultati">
        <h2>Rezultati</h2>
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
      </section>
      <section id="tabela">
        <h2>Tabela</h2>
        <label htmlFor="season">Sezona:</label>
        <select
          defaultValue={""}
          required
          name="season"
          onChange={handleSeasonSelect}
        >
          <option value="" disabled hidden>
            Odaberi...
          </option>
          {seasons.map((e) => {
            return (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            );
          })}
        </select>

        <table>
          <tbody>
            <tr>
              <th>TIM</th>
              <th>ODIGR.</th>
              <th>POB.</th>
              <th>POR.</th>
              <th>KOŠ+</th>
              <th>KOŠ-</th>
              <th>RAZ</th>
              <th>BOD.</th>
            </tr>

            {tableList &&
              tableList.map((e) => (
                <tr key={e.teamId}>
                  <TableItem item={e}></TableItem>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
      <section id="timovi">
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
      </section>
      <section id="media">
      <h2>Media</h2>
      </section>
      <section id="onama">
      <h2>O nama</h2>
      </section>
      <section id="kontakt">
      <h2>Kontakt</h2>
      </section>
    </>
  );
}

export default HomePage;
