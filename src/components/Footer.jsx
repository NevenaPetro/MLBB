import React from 'react'
import './_footer.scss'
import Logo from "../assets/mlbb_logo_2.png";

function Footer() {
  return (
    <div className='footer-wrapper'>
      <img src={Logo} alt="logo" />
      <p>Copyright @ 2023, All rights reserved.</p>
    </div>
  )
}

export default Footer
