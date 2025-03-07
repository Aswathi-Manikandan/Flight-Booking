

import React from "react";
import './App.css'

import Header from "./components/Header/Header";
import FlightList from "./components/FlightList/FlightList";

const App = () => {
  return (
    <div>
      <Header />
      <FlightList/>
    </div>
  );
};

export default App;
