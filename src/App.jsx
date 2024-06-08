/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import searchService from "./services/search";

const CountryInfo = (props) => {
    console.log(props.weather);
    return (
        <div>
            <h1>{props.country.name.common}</h1>
            <p>Capital: {props.country.capital}</p>
            <p>Area: {props.country.area}</p>
            <h4>Languages:</h4>
            <ul>
                {Object.entries(props.country.languages).map((entry) => (
                    <li>{entry[1]}</li>
                ))}
            </ul>
            <img src={props.country.flags.png} alt="" />
            {/* <h2>Weather in {props.weather.location.name}</h2>
            <p>Temperature: {props.weather.current.temp_c}C</p>
            <img src={props.weather.current.condition.icon} alt="" />
            <p>Wind: {props.weather.current.wind_kph} kph</p> */}
        </div>
    );
};

const Country = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [weatherInfo, setWeatherInfo] = useState([]);
    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // if (isOpen) {
        //     searchService.getWeather(props.country.capital).then((weather) => {
        //         setWeatherInfo(weather.data);
        //     });
        // }

        if (isOpen) {
            searchService
                .getNewWeather({
                    key: searchService.newApiKey,
                    q: `${props.country.capital}`,
                })
                .then((data) => {
                    setWeatherInfo(data.data);
                });
        }
    }, [isOpen]);

    return (
        <div>
            {isOpen ? (
                <>
                    <CountryInfo
                        country={props.country}
                        weather={weatherInfo}
                    />
                    <Button isOpen={isOpen} onClick={handleOpen} />
                </>
            ) : (
                <li>
                    {props.name} <Button isOpen={isOpen} onClick={handleOpen} />
                </li>
            )}
        </div>
    );
};

const Button = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.isOpen ? "Close" : "Open"}
        </button>
    );
};

const CountryList = (props) => {
    const countriesToShow = props.countries.filter((country) => {
        return country.name.common
            .toLowerCase()
            .includes(props.search.toLowerCase());
    });

    if (props.search && countriesToShow.length === 1) {
        console.log(countriesToShow[0]);
        console.log("huh");
        return <CountryInfo country={countriesToShow[0]} />;
    }

    if (props.search)
        return (
            <ul>
                {countriesToShow.length <= 10
                    ? countriesToShow.map((country) => (
                          <Country
                              country={country}
                              key={country.cca2}
                              CountryInfo={CountryInfo}
                              name={country.name.common}
                          />
                      ))
                    : "Too many options, specify the country"}
            </ul>
        );
};

function App() {
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        searchService.getAll().then((initialCountries) => {
            setCountries(initialCountries.data);
        });
    }, []);

    const handleSearchChange = (event) => {
        console.log(event.target.value);
        setSearch(event.target.value);
    };

    return (
        <div>
            <form action="submit">
                <span>find countries</span>
                <input value={search} onChange={handleSearchChange} />
                <CountryList
                    search={search}
                    countries={countries}
                    Button={Button}
                    Country={Country}
                    CountryInfo={CountryInfo}
                />
            </form>
        </div>
    );
}

export default App;
