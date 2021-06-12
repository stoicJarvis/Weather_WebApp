import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import FilterDramaIcon from "@material-ui/icons/FilterDrama";

const WeatherApp = () => {
  const [city, setCity] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const searchCity = async (search) => {
    if (search) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=14c8dc2cb84673837f3f07d71d2810ea`;
      const response = await fetch(url);
      const jsonResponse = await response.json();
      if (jsonResponse.cod === 200) {
        setCity(jsonResponse);
      } else {
        setCity(null);
        toast.error("No data found");
      }
    } else {
      toast.dark("Invalid Input");
    }
  };

  return (
    <>
      <div className="app">
        <h2 className="head">
          Current Climate <FilterDramaIcon className="icon" />
        </h2>

        <div className="inputs">
          <input
            type="text"
            value={search}
            placeholder="Search City"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></input>
          <button className="btn" onClick={() => searchCity(search)}>
            Search
          </button>
        </div>

        {!city ? (
          <p className="msg">No data found</p>
        ) : (
          <div className="info">
            <h3 className="city">
              {city.name} | {city.sys.country}
            </h3>
            <h4 className="temp"> Temprature : {city.main.temp} °C</h4>
            <h5 className="min-max">
              Min Temprature : {city.main.temp_min} °C | Max Temprature :{" "}
              {city.main.temp_max} °C
            </h5>
            <h4 className="hp">
              Humidity : {city.main.humidity} % | Pressure: {city.main.pressure}{" "}
              Pascal
            </h4>
          </div>
        )}
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default WeatherApp;
