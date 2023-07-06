import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import Logo from "../../assets/mlbb_logo_2.png";
import "../Header/_header.scss";

function Header() {
  const [activeHamburger, setActiveHamburger] = useState(false);
  const [activeTab, setActiveTab] = useState(false);
  const menuIcon = "menuIcon";
  const [isScrolled, setScrolled] = useState(false);
  const { loggedIn, checkingStatus } = useAuthStatus();
  const auth = getAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = () => {
    if (window.scrollY > 250) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  return (
    <div className={`header-container ${isScrolled && "header-scrolled"}`}>
      <div className="logo">
      <Link
            to={"/"}
            state={{ section: "welcomepage-wrapper" }}
            onClick={() => {
              setActiveTab(!activeTab);
            }}
          >
            <img src={Logo} alt="logo" />
          </Link>
        
      </div>
      <div className="menu">
        <div
          className={`hamburger ${activeHamburger ? menuIcon : ""}`}
          onClick={() => {
            setActiveHamburger(!activeHamburger);
          }}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <nav className={`navigation ${activeHamburger ? menuIcon : ""}`}>
          <Link
            to={"/"}
            state={{ section: "raspored" }}
            onClick={() => {
              setActiveTab(!activeTab);
              setActiveHamburger(false);
            }}
          >
            Raspored
          </Link>
          <Link
            to={"/"}
            state={{ section: "rezultati" }}
            onClick={() => {
              setActiveTab(!activeTab);
              setActiveHamburger(false);
            }}
          >
            Rezultati
          </Link>
          <Link
            to={"/"}
            state={{ section: "tabela" }}
            onClick={() => {
              setActiveTab(!activeTab);
              setActiveHamburger(false);
            }}
          >
            Tabela
          </Link>
          <Link
            to={"/"}
            state={{ section: "timovi" }}
            onClick={() => {
              setActiveTab(!activeTab);
              setActiveHamburger(false);
            }}
          >
            Timovi
          </Link>
          <Link
            to={"/"}
            state={{ section: "media" }}
            onClick={() => {
              setActiveTab(!activeTab);
              setActiveHamburger(false);
            }}
          >
            Media
          </Link>
          <Link
            to={"/"}
            state={{ section: "onama" }}
            onClick={() => {
              setActiveTab(!activeTab);
              setActiveHamburger(false);
            }}
          >
            O nama
          </Link>
          <Link
            to={"/"}
            state={{ section: "kontakt" }}
            onClick={() => {
              setActiveTab(!activeTab);
              setActiveHamburger(false);
            }}
          >
            Kontakt
          </Link>
        </nav>
      </div>
      <div className="login-header">
        {loggedIn && !checkingStatus && auth.currentUser && (
          <>
            <div className="login_info">
              <p>You are logged in: </p>
              <p>&nbsp;{auth.currentUser.email}</p>
            </div>
            <button type="button" onClick={onLogout}>
              Log out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
