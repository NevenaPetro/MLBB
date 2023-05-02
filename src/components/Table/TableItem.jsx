import React from "react";
import { useContext } from "react";
import { applicationContext } from "../../context/AplicationContext";

function TableItem({item}) {
  const { games, getTeamById } = useContext(applicationContext);
  console.log(item)
  console.log(item.teamId)
  return (
    <>
      <td>{getTeamById(item.teamId)}</td>
      <td>{item.wins}</td>
      <td>{item.loses}</td>
      <td>{item.pointsScored}</td>
      <td>{item.pointsReceived}</td>
      <td>{item.pointsDifference}</td>
      <td>{item.points}</td>
    </>
  );
}

export default TableItem;
