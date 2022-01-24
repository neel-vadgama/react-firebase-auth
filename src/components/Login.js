import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  let navigate = useNavigate();
  let auth = getAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginEmail === "" || loginPassword === "") {
      alert("Enter All Required Fields");
      return;
    }
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((res) => {
        navigate("/home");
        sessionStorage.setItem("Auth Token", res._tokenResponse.refreshToken);
      })
      .catch((err) => {
        console.log(err.code);
        if (err.code === "auth/invalid-email") {
          alert(`Please Enter valid email`);
        }
        if (err.code === "auth/wrong-password") {
          alert("Wrong Password");
        }
        if (err.code === "auth/user-not-found") {
          alert("Email is not Registered, Check your email");
        }
      });
    setLoginEmail("");
    setLoginPassword("");
  };
  return (
    <Grid container spacing={2} marginTop={10}>
      <Grid item xs={12}>
        <h4>Login Page</h4>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="login-email"
          onChange={(e) => setLoginEmail(e.target.value)}
          value={loginEmail}
          label="Email"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          type="password"
          id="login-password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          label="Password"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Button label="Login" variant="contained" onClick={handleSubmit}>
          Login
        </Button>
      </Grid>
      <Grid item xs={12} marginTop={2}>
        <a href="/register">Go to Register Page</a>
      </Grid>
    </Grid>
  );
};

export default Login;
