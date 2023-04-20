import React from "react";
import Moment from "react-moment";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useContext } from "react";
import { applicationContext } from "../../src/context/AplicationContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import moment from "moment";
import "moment/locale/sr";

function GameItem({ item }) {
  moment.locale("sr");
  const { loggedIn, checkingStatus } = useAuthStatus();
  const { getLocationById, getTeamById } = useContext(applicationContext);
  return (
    <>
      {!item.played && (
        <>
          <span>
            <b>Datum:</b> <Moment format="LLLL">{item.date}</Moment>
          </span>
          <span>
            {" "}
            <b>Lokacija:</b> {getLocationById(item.location)}
          </span>
          <br />
          <p>
            {getTeamById(item.team1)} : {getTeamById(item.team2)}
          </p>
          {loggedIn && (
            <>
              <button><DeleteForeverIcon />Obriši utakmicu</button>
              <button><BorderColorIcon />Izmeni utakmicu</button>
              <button><CheckCircleIcon />Završi utakmicu</button>
            </>
          )}
          <br />
          <br />
        </>
      )}
    </>
  );
}

export default GameItem;
