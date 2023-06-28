import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Header/_header.scss";
import Logo from "../../assets/mlbb_logo_2.png";

function Header() {
  const [active, setActive] = useState(false);
  const [activeTab, setActiveTab] = useState(false);
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
           to={"/"}
           state={{ section: "raspored" }}
            onClick={() => {
              setActiveTab(!activeTab);
            }}
          >
            Raspored
          </Link>
          <Link
           to={"/"}
           state={{ section: "rezultati" }}
            onClick={() => {
              setActiveTab(!activeTab);
            }}
          >
            Rezultati
          </Link>
          <Link
            to={"/"}
            state={{ section: "tabela" }}
            onClick={() => {
              setActiveTab(!activeTab);
            }}
          >
            Tabela
          </Link>
          <Link
            to={"/"}
            state={{ section: "timovi" }}
            onClick={() => {
              setActiveTab(!activeTab);
            }}
          >
            Timovi
          </Link>
          <Link
            to={"/"}
            state={{ section: "media" }}
            onClick={() => {
              setActiveTab(!activeTab);
            }}
          >
            Media
          </Link>
          <Link
            to={"/"}
            state={{ section: "onama" }}
            onClick={() => {
              setActiveTab(!activeTab);
            }}
          >
            O nama
          </Link>
          <Link
            to={"/"}
            state={{ section: "kontakt" }}
            onClick={() => {
              setActiveTab(!activeTab);
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
