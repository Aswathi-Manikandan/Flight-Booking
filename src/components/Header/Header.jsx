import React, { useState } from "react";
import "./Header.css";

import kuwaitFlag from "../../assets/kuwait.png"; 
import uaeFlag from "../../assets/uae.png"; 
import usaFlag from "../../assets/usa.png"; 

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "KWD",
    flag: kuwaitFlag,
  });

  const countries = [
    { name: "KWD", flag: kuwaitFlag },
    { name: "AED", flag: uaeFlag },
    { name: "USD", flag: usaFlag },
  ];

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
  };

  return (
    <header className="header">
    
      <div className="logo">
        <h2>ALMUSAFEER</h2> 
      </div>

     
      <div className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      
      <nav className={`nav-links ${showMenu ? "active" : ""}`}>
        <a href="#">Home</a>
        <a href="#">My Booking</a>
        <a href="#">Register</a>
        <a href="#">Login</a>
        <a href="#">Contact</a>
      </nav>

   
      <div className="currency-selector" onClick={() => setShowDropdown(!showDropdown)}>
        <img src={selectedCountry.flag} alt={selectedCountry.name} className="flag" />
        <span className="currency">{selectedCountry.name}</span>
        <span className="arrow">&#9662;</span>
        {showDropdown && (
          <ul className="dropdown">
            {countries.map((country, index) => (
              <li key={index} onClick={() => handleCountryChange(country)}>
                <img src={country.flag} alt={country.name} className="flag" />
                {country.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
