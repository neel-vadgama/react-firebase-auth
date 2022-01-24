import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/login");
  };

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="home">
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
