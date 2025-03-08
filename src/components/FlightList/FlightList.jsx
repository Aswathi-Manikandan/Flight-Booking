import React, { useState, useEffect } from "react";
import flights from "../../data/flights";
import "../FlightList/FlightList.css";
import { FaMapMarkerAlt, FaPlane, FaThumbsUp } from "react-icons/fa"; // Import icons

const FlightList = () => {
  const [sortBy, setSortBy] = useState("price-low");
  const [filterBy, setFilterBy] = useState(null);
  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    setFilteredFlights(applySorting(flights));
  }, []);

  const applySorting = (flightsToSort) => {
    if (sortBy === "all") return flightsToSort;
    return [...flightsToSort].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "departure-earliest") return a.departure.localeCompare(b.departure);
      if (sortBy === "departure-latest") return b.departure.localeCompare(a.departure);
      if (sortBy === "duration-shortest") return parseFloat(a.duration) - parseFloat(b.duration);
      if (sortBy === "duration-longest") return parseFloat(b.duration) - parseFloat(a.duration);
      return 0;
    });
  };

  const handleFilter = (type) => {
    if (filterBy === type) {
      setFilterBy(null);
      setFilteredFlights(applySorting(flights));
    } else {
      setFilterBy(type);
      if (type === "cheapest") {
        const cheapestFlight = flights.reduce((prev, curr) => (prev.price < curr.price ? prev : curr));
        setFilteredFlights([cheapestFlight]);
      } else if (type === "fastest") {
        const fastestFlight = flights.reduce((prev, curr) => (parseFloat(prev.duration) < parseFloat(curr.duration) ? prev : curr));
        setFilteredFlights([fastestFlight]);
      } else if (type === "bestvalue") {
        setFilteredFlights(flights.filter((flight) => flight.price <= 500 && parseFloat(flight.duration) <= 3));
      }
    }
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
    setFilterBy(null);
    if (selectedSort === "all") {
      setFilteredFlights(flights);
    } else {
      setFilteredFlights(applySorting(flights));
    }
  };

  return (
    <div className="flight-container">
      <h2>Available Flights</h2>

      <div className="controls">
        <select className="sort-dropdown" value={sortBy} onChange={handleSortChange}>
          <option value="all">Sort: All</option>
          <option value="price-low">Sort: Price (Low to High)</option>
          <option value="price-high">Sort: Price (High to Low)</option>
          <option value="departure-earliest">Sort: Departure (Earliest First)</option>
          <option value="departure-latest">Sort: Departure (Latest First)</option>
          <option value="duration-shortest">Sort: Duration (Shortest First)</option>
          <option value="duration-longest">Sort: Duration (Longest First)</option>
        </select>

        <div className="filter-buttons">
          <button className={filterBy === "cheapest" ? "active" : ""} onClick={() => handleFilter("cheapest")}>
            <FaPlane /> Cheapest
          </button>
          <button className={filterBy === "fastest" ? "active" : ""} onClick={() => handleFilter("fastest")}>
            <FaPlane /> Fastest
          </button>
          <button className={filterBy === "bestvalue" ? "active" : ""} onClick={() => handleFilter("bestvalue")}>
            <FaThumbsUp /> Best Value
          </button>
        </div>
      </div>

      <div className="flight-list">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight, index) => (
            <div key={index} className="flight-card">
              <div className="flight-info">
                <div className="departure-row">
                  <p className="departure-text">Departure</p>
                  <p className="departure-date">on {flight.departureDate}</p>
                </div>

                <div className="airline-row">
                  <img src={flight.logo} alt={flight.airline} className="airline-logo" />
                  <h3 className="airline-name">{flight.airline}</h3>
                  <div className="flight-time">
                    <div className="flight-details">
                      <div className="flight-column">
                        <p className="time">{flight.departure}</p>
                        <p className="location">{flight.from}</p>
                      </div>

                      <FaMapMarkerAlt className="icon-location" />

                      <div className="separator-container">
                        <span className="time-separator">---------------------------------</span>
                        <p className="duration">{flight.duration}h</p>
                      </div>

                      <FaPlane className="icon-plane" />

                      <div className="flight-column">
                        <p className="time">{flight.arrival}</p>
                        <p className="location">{flight.to}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="departure-row">
                  <p className="departure-text1">RETURN</p>
                  <p className="departure-date1">{flight.departureDate}</p>
                </div>

                <div className="airline-row">
                  <img src={flight.logo} alt={flight.airline} className="airline-logo" />
                  <h3 className="airline-name">{flight.airline}</h3>
                  <div className="flight-time">
                    <div className="flight-details">
                      <div className="flight-column">
                        <p className="time">{flight.departure}</p>
                        <p className="location">{flight.from}</p>
                      </div>

                      <FaMapMarkerAlt className="icon-location" />

                      <div className="separator-container">
                        <span className="time-separator">---------------------------------</span>
                        <p className="duration">{flight.duration}h</p>
                      </div>

                      <FaPlane className="icon-plane" />

                      <div className="flight-column">
                        <p className="time">{flight.arrival}</p>
                        <p className="location">{flight.to}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="price-section">
                  <p className="price">Price: ${flight.price}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No flights match this filter.</p>
        )}
      </div>
    </div>
  );
};

export default FlightList;
