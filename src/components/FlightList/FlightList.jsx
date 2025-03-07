import React, { useState } from "react";
import flights from "../../data/flights";
import "../FlightList/FlightList.css";

const FlightList = () => {
  const [sortBy, setSortBy] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Sorting function
  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "departure-earliest") return a.departure.localeCompare(b.departure);
    if (sortBy === "departure-latest") return b.departure.localeCompare(a.departure);
    if (sortBy === "duration-shortest") return a.duration.localeCompare(b.duration);
    if (sortBy === "duration-longest") return b.duration.localeCompare(a.duration);
    return 0;
  });

  // Filtering function
  const filteredFlights = sortedFlights.filter((flight) =>
    filterPrice ? flight.price <= filterPrice : true
  );

  return (
    <div className="flight-container">
      <h2>Available Flights</h2>

      {/* Sorting & Filtering Controls */}
      <div className="controls">
        {/* Sort Button with Dropdown */}
        <div className="sort-container">
          <button
            className={`sort-button ${dropdownOpen ? "open" : ""}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Sort: {sortBy ? sortBy.replace("-", " "): "Select"} 
            <span className={`arrow ${dropdownOpen ? "rotate" : ""}`}>⌄</span>
          </button>

          {dropdownOpen && (
            <div className="sort-dropdown">
              <button onClick={() => { setSortBy("price-low"); setDropdownOpen(false); }}>Price (Low to High)</button>
              <button onClick={() => { setSortBy("price-high"); setDropdownOpen(false); }}>Price (High to Low)</button>
              <button onClick={() => { setSortBy("departure-earliest"); setDropdownOpen(false); }}>Departure (Earliest First)</button>
              <button onClick={() => { setSortBy("departure-latest"); setDropdownOpen(false); }}>Departure (Latest First)</button>
              <button onClick={() => { setSortBy("duration-shortest"); setDropdownOpen(false); }}>Duration (Shortest First)</button>
              <button onClick={() => { setSortBy("duration-longest"); setDropdownOpen(false); }}>Duration (Longest First)</button>
            </div>
          )}
        </div>

        {/* Price Filter */}
        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) => setFilterPrice(e.target.value)}
        />
      </div>

      {/* Flight List */}
      <div className="flight-list">
        {filteredFlights.map((flight, index) => (
          <div key={index} className="flight-card">
            <img src={flight.logo} alt={flight.airline} className="airline-logo" />
            <div className="flight-details">
              <h3>{flight.airline}</h3>
              <p>
                <strong>{flight.from}</strong> ➝ <strong>{flight.to}</strong>
              </p>
              <p>Departure: {flight.departure} | Arrival: {flight.arrival}</p>
              <p>Duration: {flight.duration}</p>
              <p className="price">Price: ${flight.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightList;
