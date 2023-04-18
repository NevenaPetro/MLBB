import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "../Header/header.css";

function Header() {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    email: auth.currentUser.email,
  });
  const {email} = formData;
  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <>
      <header className="header">
        <div>
          <h3>My profile</h3>
          <p>{email}</p>
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
