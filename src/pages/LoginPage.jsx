import React from "react";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      if (userCredentials.user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          id="password"
          value={password}
          onChange={onChange}
        />
        <VisibilityIcon
          alt="show password"
          onClick={() => setShowPassword((prevState) => !prevState)}
        />
        <Link to="/forgot-password">Forgot Password?</Link>
        <button>Log in</button>
      </form>
    </>
  );
}

export default LoginPage;
