import React from "react";
import { Link } from "react-router-dom";
import "../Header/header.css";


function Header() {
  return (
    <>
      <header className="header">
        <div>
          <Link to="/">
            <h3>M L B B</h3>
          </Link>
        </div>
        <nav className="menu">
          <Link to="/raspored">
            <button className="header-btn">RASPORED</button>
          </Link>
          <Link to="/rezultati">
            <button className="header-btn">REZULTATI</button>
          </Link>
          <Link to="/tabela">
            <button className="header-btn">TABELA</button>
          </Link>
          <Link to="/timovi">
            <button className="header-btn">TIMOVI</button>
          </Link>
          <Link to="/media">
            <button className="header-btn">MEDIA</button>
          </Link>
          <Link to="/onama">
            <button className="header-btn">O NAMA</button>
          </Link>
          <Link to="/kontakt">
            <button className="header-btn">KONTAKT</button>
          </Link>
        </nav>
      </header>
      
    </>
  );
}

export default Header;
