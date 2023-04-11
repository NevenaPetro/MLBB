import React from 'react'
import { Link } from 'react-router-dom';
import '../Header/header.css'

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
  )
}

export default Header
