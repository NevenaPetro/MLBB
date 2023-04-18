import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import "../Header/header.css";

function Header() {
  const { loggedIn, checkingStatus} = useAuthStatus()
  const auth = getAuth();

  
  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <>
      <header className="header">
        <div>
          
          <p>{loggedIn ? auth.currentUser.email : 'bla'}</p>
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </div>

        <div>
          <Link to="/">
            <h3>M L B B</h3>
          </Link>
        </div>
        <nav className="menu">
          <Link to="/raspored">
            <button className="header-btn">Raspored</button>
          </Link>
          <Link to="/rezultati">
            <button className="header-btn">Rezultati</button>
          </Link>
          <Link to="/tabela">
            <button className="header-btn">Tabela</button>
          </Link>
          <Link to="/timovi">
            <button className="header-btn">Timovi</button>
          </Link>
          <Link to="/media">
            <button className="header-btn">Media</button>
          </Link>
          <Link to="/onama">
            <button className="header-btn">O nama</button>
          </Link>
          <Link to="/kontakt">
            <button className="header-btn">Kontakt</button>
          </Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
