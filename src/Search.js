import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

import TodayWeather from "./TodayWeather";
import Forecast from "./Forecast";

export default function Search({ date }) {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState("");
  let [loaded, setLoaded] = useState(false);
  let cityStart = "london";
  const apiKey = "faf1t205ab1o74d732b54981fbc56c80";
  const weatherApiUrl = "https://api.shecodes.io/weather/v1/";

  function updateCity(event) {
    setCity(event.target.value);
  }

  // API Calls
  useEffect(() => {
    function starterWeather(city) {
      setLoaded(false);
      const currentWeatherUrl = `${weatherApiUrl}current?query=${city}&key=${apiKey}&units=metric`;
      const forecastUrl = `${weatherApiUrl}forecast?query=${city}&key=${apiKey}&units=metric`;

      axios.all([axios.get(currentWeatherUrl), axios.get(forecastUrl)]).then(
        axios.spread((weatherResponse, forecastResponse) => {
          updateWeather(weatherResponse);
          addForecast(forecastResponse);
        })
      );
    }

    starterWeather(cityStart);
  }, [cityStart]);

  function getWeatherAndForecast(event) {
    event.preventDefault();
    const currentWeatherUrl = `${weatherApiUrl}current?query=${city}&key=${apiKey}&units=metric`;
    const forecastUrl = `${weatherApiUrl}forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.all([axios.get(currentWeatherUrl), axios.get(forecastUrl)]).then(
      axios.spread((weatherResponse, forecastResponse) => {
        updateWeather(weatherResponse);
        addForecast(forecastResponse);
      })
    );
  }

  // Update Variables
  function updateWeather(response) {
    setWeather({
      temp: Math.round(response.data.temperature.current),
      city: response.data.city,
      condition: response.data.condition.description,
      wind: Math.round(response.data.wind.speed * 3.6),
      humidity: response.data.temperature.humidity,
    });
  }

  function addForecast(response) {
    setWeather((prevWeather) => ({
      ...prevWeather,
      tempMin: Math.round(response.data.daily[0].temperature.maximum),
      tempMax: Math.round(response.data.daily[0].temperature.minimum),
      forecast: response.data.daily,
    }));
    setLoaded(true);
  }

  //Loading the page

  const form = (
    <section className="search mt-sm">
      <form className="form" onSubmit={getWeatherAndForecast}>
        <input
          type="text"
          placeholder="Search"
          className="form-input"
          onChange={updateCity}
        />
        <input type="submit" className="form-submit" />
      </form>
    </section>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <TodayWeather weather={weather} date={date} />
        <Forecast weather={weather} />
      </div>
    );
  } else {
    return (
      <div>
        {form}
        <ReactLoading type="spin" className="loading" />
      </div>
    );
  }
}

//
