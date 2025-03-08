import React, { useState, useEffect } from "react";
import flights from "../../data/flights";
import "../FlightList/FlightList.css";
import { FaMapMarkerAlt, FaPlane } from "react-icons/fa"; // Import icons

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
      if (sortBy === "duration-shortest") return a.duration.localeCompare(b.duration);
      if (sortBy === "duration-longest") return b.duration.localeCompare(a.duration);
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
        const fastestFlight = flights.reduce((prev, curr) => (prev.duration < curr.duration ? prev : curr));
        setFilteredFlights([fastestFlight]);
      } else if (type === "bestvalue") {
        setFilteredFlights(flights.filter((flight) => flight.price <= 500 && flight.duration <= "3h"));
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
          <option value="price-low">Sort: Price </option>
          <option value="price-high">Sort: Price (High to Low)</option>
          <option value="departure-earliest">Sort: Departure (Earliest First)</option>
          <option value="departure-latest">Sort: Departure (Latest First)</option>
          <option value="duration-shortest">Sort: Duration (Shortest First)</option>
          <option value="duration-longest">Sort: Duration (Longest First)</option>
        </select>

        <div className="filter-buttons">
          <button className={filterBy === "cheapest" ? "active" : ""} onClick={() => handleFilter("cheapest")}>
            Cheapest
          </button>
          <button className={filterBy === "fastest" ? "active" : ""} onClick={() => handleFilter("fastest")}>
            Fastest
          </button>
          <button className={filterBy === "bestvalue" ? "active" : ""} onClick={() => handleFilter("bestvalue")}>
            Best Value
          </button>
        </div>
      </div>

      <div className="flight-list">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight, index) => (
            <div key={index} className="flight-card">
              <div className="flight-info">
                {/* Departure and Date in One Line */}
                <div className="departure-row">
                  <p className="departure-text">Departure</p>
                  <p className="departure-date">on{flight.departureDate}</p>
                </div>

                {/* Airline Logo, Name, and Flight Timing */}
                <div className="airline-row">
                  <img src={flight.logo} alt={flight.airline} className="airline-logo" />
                  <h3 className="airline-name">{flight.airline}</h3>
                  <div className="flight-time">
                  <div className="flight-time">
                <div className="flight-details">
                    <div className="flight-column">
                    <p className="time">{flight.departure}</p>
                    <p className="location">{flight.from}</p>
                    </div>

                    <FaMapMarkerAlt className="icon-location" />

                    <div className="separator-container">
                    <span className="time-separator">---------------------------------------</span>
                    <p className="duration">{flight.duration}</p> {/* Centered duration */}
                    </div>

                    <FaPlane className="icon-plane" />

                    <div className="flight-column">
                    <p className="time">{flight.arrival}</p>
                    <p className="location">{flight.to}</p>
                    </div>
                </div>
                </div>

                </div>

                </div>
                <div className="departure-row">
                  <p className="departure-text1">RETURN</p>
                  <p className="departure-date1">{flight.departureDate}</p>
                </div>

                {/* Airline Logo, Name, and Flight Timing */}
                <div className="airline-row">
                  <img src={flight.logo} alt={flight.airline} className="airline-logo" />
                  <h3 className="airline-name">{flight.airline}</h3>
                  <div className="flight-time">
                  <div className="flight-time">
                <div className="flight-details">
                    <div className="flight-column">
                    <p className="time">{flight.departure}</p>
                    <p className="location">{flight.from}</p>
                    </div>

                    <FaMapMarkerAlt className="icon-location" />

                    <div className="separator-container">
                    <span className="time-separator">---------------------------------------</span>
                    <p className="duration">{flight.duration}</p> {/* Centered duration */}
                    </div>

                    <FaPlane className="icon-plane" />

                    <div className="flight-column">
                    <p className="time">{flight.arrival}</p>
                    <p className="location">{flight.to}</p>
                    </div>
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
