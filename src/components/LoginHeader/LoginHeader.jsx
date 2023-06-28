import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import "../LoginHeader/_loginHeader.scss";

function LoginHeader() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const auth = getAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className="login-header">
      {loggedIn && !checkingStatus && auth.currentUser && (
        <>
          <div className="login_info">
            <p>You are logged in:</p>
            <p>{auth.currentUser.email}</p>
          </div>
          <button type="button" onClick={onLogout}>
            Log out
          </button>
        </>
      )}
    </div>
  );
}

export default LoginHeader;
