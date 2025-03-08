

import React from "react";
import './App.css'

import Header from "./components/Header/Header";
import FlightList from "./components/FlightList/FlightList";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <div>
      <Sidebar/>
      <Header />
      <FlightList/>
    </div>
  );
};

export default App;
