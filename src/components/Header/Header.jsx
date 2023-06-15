import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Header/_header.scss";
import Logo from "../../assets/mlbb_logo.png";

function Header() {
  const [active, setActive] = useState(false);
  const menuIcon = "menuIcon";
  return (
    <>
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="menu">
        <div
          className={`hamburger ${active ? menuIcon : ""}`}
          onClick={() => {
            setActive(!active);
          }}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <nav className={`navigation ${active ? menuIcon : ""}`}>
          <Link
            to="/raspored"
            onClick={() => {
              setActive(!active);
            }}
          >
            Raspored
          </Link>
          <Link
            to="/rezultati"
            onClick={() => {
              setActive(!active);
            }}
          >
            Rezultati
          </Link>
          <Link
            to="/tabela"
            onClick={() => {
              setActive(!active);
            }}
          >
            Tabela
          </Link>
          <Link
            to="/timovi"
            onClick={() => {
              setActive(!active);
            }}
          >
            Timovi
          </Link>
          <Link
            to="/media"
            onClick={() => {
              setActive(!active);
            }}
          >
            Media
          </Link>
          <Link
            to="/onama"
            onClick={() => {
              setActive(!active);
            }}
          >
            O nama
          </Link>
          <Link
            to="/kontakt"
            onClick={() => {
              setActive(!active);
            }}
          >
            Kontakt
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Header;
