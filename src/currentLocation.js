import React, { useEffect, useState } from "react";
// import apiKeys from "./apiKeys";
import Clock from "react-live-clock";
import axios from "axios";
import Forcast from "./forcast";
import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";
const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};
const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

const Weather = () => {
  const apiKey = "50b32c5dd04e47d3873975712bc3e812";
  const [temprature, setTemprature] = useState("");
  const [data, setData] = useState({
    temperatureC: undefined,
    temperatureF: undefined,
    city: "pune",
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    main: "",
    icon: "",
  });

  useEffect(() => {
      getWetherDetails(data.city);
    
  }, []);

  const getWetherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        const tempC = Math.round(res.data.main.temp - 273.15);
        setData((prevState)=>
        ({
          ...prevState,
          city: res.data.name,
          humidity: res.data.main.humidity,
          country: res.data.sys.country,
          main: res.data.weather[0].main,
        }));
        setTemprature(tempC);
        switch (data.main) {
          case "Haze":
            setData({ icon: "CLEAR_DAY" });
            break;
          case "Clouds":
            setData({ icon: "CLOUDY" });
            break;
          case "Rain":
            setData({ icon: "RAIN" });
            break;
          case "Snow":
            setData({ icon: "SNOW" });
            break;
          case "Dust":
            setData({ icon: "WIND" });
            break;
          case "Drizzle":
            setData({ icon: "SLEET" });
            break;
          case "Fog":
            setData({ icon: "FOG" });
            break;
          case "Smoke":
            setData({ icon: "FOG" });
            break;
          case "Tornado":
            setData({ icon: "WIND" });
            break;
          default:
            setData({ icon: "CLEAR_DAY" });
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };


  return (
    <>
      {data ? (
        <React.Fragment>
          <div className="city">
            <div className="title">
              <h2>{data.city}</h2>
              <h3>{data.country}</h3>
            </div>
            <div className="mb-icon">
              {" "}
              <ReactAnimatedWeather
                icon={data.icon}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
              <p>{data.main}</p>
            </div>
            <div className="date-time">
              <div className="dmy">
                <div id="txt"></div>
                <div className="current-time">
                  <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temperature">
                <p>
                  {temprature}°<span>C</span>
                </p>
                {/* <span className="slash">/</span>
                {data.temperatureF} &deg;F */}
              </div>
            </div>
          </div>
          <Forcast icon={data.icon} weather={data.main} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} />
          <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
            Detecting your location
          </h3>
          <h3 style={{ color: "white", marginTop: "10px" }}>
            Your current location wil be displayed on the App <br></br> & used
            for calculating Real time weather.
          </h3>
        </React.Fragment>
      )}
    </>
  );
};

export default Weather;
