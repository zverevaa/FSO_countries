import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const apiKey = import.meta.env.VITE_WEATHER_KEY;
const newApiKey = import.meta.env.VITE_NEW_WEATHER_KEY;

const getAll = () => {
    return axios.get(`${baseUrl}/all`);
};

const getWeather = (city) => {
    return axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
};

const getNewWeather = (params) => {
    return axios.get(`http://api.weatherapi.com/v1/current.json`, { params });
};

export default { getAll, getWeather, apiKey, newApiKey, getNewWeather };
