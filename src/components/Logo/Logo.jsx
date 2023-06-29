import React from 'react'
import './_logo.scss'
import LogoPicture from "../../assets/mlbb_logo_2.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    
      <div className="logo">
        <Link to="/">
          <img src={LogoPicture} alt="logo" />
        </Link>
      </div>
    
  )
}

export default Logo
