import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerEmail === "" || registerPassword === "") {
      alert("Enter All Required Credentials");
      return;
    }
    console.log("data: ", registerEmail, registerPassword);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((res) => {
        navigate("/login");
        alert(`New User Registered Successfully!`);
        sessionStorage("Auth token", res._tokenResponse.refreshToken);
      })
      .catch((err) => {
        console.log(err.code);
        if (err.code === "auth/email-already-in-use") {
          alert("Email Already in Use, Try Different Email-id");
        }
      });
    setRegisterEmail("");
    setRegisterPassword("");
  };
  return (
    <Grid container spacing={2} marginTop={10}>
      <Grid item xs={12}>
        <h4>Register Page</h4>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="register-email"
          onChange={(e) => setRegisterEmail(e.target.value)}
          value={registerEmail}
          label="Email"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          type="password"
          id="register-password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          label="Password"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Button label="Register" variant="contained" onClick={handleSubmit}>
          Register
        </Button>
      </Grid>

      <Grid item xs={12} marginTop={2}>
        <a href="/login">Go to Login Page</a>
      </Grid>
    </Grid>
  );
};

export default Login;
