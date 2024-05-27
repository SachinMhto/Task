import React from "react";
import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { darkTheme } from "./theme/darktheme";
import Navbar from "./Component/Navbar/Navbar";

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Navbar />
      </ThemeProvider>
    </>
  );
}

export default App;
