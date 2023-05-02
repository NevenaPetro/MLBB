import React from "react";
import { useContext, useState } from "react";
import { applicationContext } from "../context/AplicationContext";
import TableItem from "../components/Table/TableItem";

function TablePage() {
  const { games, seasons, teams } = useContext(applicationContext);
  const [selectedSeason, setSelectedSeason] = useState("");
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
      existing2.gamesPlayed += 1;
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

  return (
    <div>
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
    </div>
  );
}

export default TablePage;
