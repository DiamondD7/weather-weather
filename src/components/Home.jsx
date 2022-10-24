import React, { useState, useEffect } from "react";
import { FULL_URL } from "../API_URL";

const Home = () => {
  const [itemsCurrent, setItemsCurrent] = useState([]);
  const [itemsLocation, setItemsLocation] = useState([]);

  const [city, setCity] = useState("Auckland");

  const getLocation = () => {
    fetch(FULL_URL + `&query=${city}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItemsCurrent(data.current);
        setItemsLocation(data.location);
      });

    const bod = document.getElementById("Body--");
    if (city !== "Auckland") {
      bod.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${city}`;
      bod.style.backgroundSize = "cover";
    } else {
      bod.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?Auckland`;
      bod.style.backgroundSize = "cover";
    }
  };

  return (
    <div>
      <div className="box-container"></div>
      <div>
        <input
          className="city-input"
          type="text"
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn-submit" onClick={getLocation}>
          Submit
        </button>
        {itemsCurrent.is_day === "no" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="sun-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="sun-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        )}
      </div>

      <p className="localtime">{itemsLocation.localtime}</p>
      <p className="degree-text">{itemsCurrent.temperature}°C</p>
      <div className="weather-description">
        <p>{itemsCurrent.weather_descriptions}</p>
        <p>Cloud cover: {itemsCurrent.cloudcover}</p>
        <p>Feels like: {itemsCurrent.feelslike}°C</p>
      </div>

      <p className="location-info">
        {itemsLocation.name}, {itemsLocation.country}
      </p>

      <ul className="weatherinfo">
        <li>Precipitation: {itemsCurrent.precip}</li>
        <li>
          Wind: {itemsCurrent.wind_speed} KMPH {itemsCurrent.wind_dir}
        </li>
        <li>Humidity: {itemsCurrent.humidity}</li>
        <li>Visibility: {itemsCurrent.visibility}</li>
      </ul>
    </div>
  );
};

export default Home;
