import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import '../LoginHeader/loginHeader.css'

function LoginHeader() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const auth = getAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate("/");

  };
 
  return (
    
    <div className='login-header'>
      {(loggedIn && !checkingStatus && auth.currentUser) && (
        <>
        <span>You are logged in:</span>
          <span>{auth.currentUser.email}</span>
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default LoginHeader;
