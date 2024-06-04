import React, { useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { darkTheme } from "./theme/darktheme";
import Navbar from "./Component/Navbar/Navbar";
import Home from "./Component/Home/Home";
import Auth from "./Component/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./ReduxToolKit/TaskSlice";
import { getUserProfile } from "./ReduxToolKit/AuthSlice";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    const jwt = auth.jwt || localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUserProfile(jwt));
      console.log("getUserProfile executed...",jwt);
    }
  }, [auth.jwt, dispatch]);

  console.log("auth", auth.jwt);
  return (
    <ThemeProvider theme={darkTheme}>
      {auth.user ? (
        <div>
          <Navbar />
          <Home />
        </div>
      ) : (
        <Auth />
      )}
    </ThemeProvider>
  );
}

export default App;
