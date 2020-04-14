import React from "react";
import "./App.css";
import Grid from "./components/grid/grid.component";
import Header from "./components/Header/header.component";
function App() {
  return (
    <div className="main-container">
      <Header />
      <Grid />
    </div>
  );
}

export default App;
