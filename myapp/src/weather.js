
import axios from 'axios';
import React, { useState } from 'react';
import './weather.css';

function Weather() {
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [temp, setTemp] = useState('');
  const [humi, setHumi] = useState('');
  const [text, setText] = useState('');
  const [icon, setIcon] = useState('');
  const [wind, setWind] = useState('');
  const [error, setError] = useState('');
  const [bg, setBg] = useState('default'); // background class

  function wet() {
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e84701fb1bc67f3791685f4f66a9de3b`
      )
      .then((res) => {
        setName(res.data.name);
        setTemp(res.data.main.temp);
        setHumi(res.data.main.humidity);
        setText(res.data.weather[0].description);
        setWind(res.data.wind.speed);
        setIcon(
          `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
        );
        setError('');

        // Set background based on weather
        const condition = res.data.weather[0].main.toLowerCase();
        if (condition.includes('cloud')) setBg('cloudy');
        else if (condition.includes('rain')) setBg('rainy');
        else if (condition.includes('clear')) setBg('sunny');
        else if (condition.includes('snow')) setBg('snowy');
        else setBg('default');
      })
      .catch((err) => {
        console.error(err);
        setError('City not found! Please enter a valid location.');
        setName('');
        setTemp('');
        setHumi('');
        setText('');
        setWind('');
        setIcon('');
        setBg('default');
      });
  }

  return (
    <div className={`weather-app ${bg}`}>
      <div className="card">
        <h1>Weather Dashboard</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={wet}>Check</button>
        </div>

        {error && <p className="error">{error}</p>}

        {name && (
          <div className="weather-info">
            <img src={icon} alt="weather-icon" />
            <h2>{name}</h2>
            <p className="temp">{temp}°C</p>
            <p className="desc">{text}</p>
            <p>Humidity: {humi}%</p>
            <p>Wind: {wind} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Weather;
