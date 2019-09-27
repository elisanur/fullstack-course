import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

const Button = ({ country, setFilter }) => {
  console.log('menee Buttoniin')

  return (
    <button
      onClick={() => setFilter(country.name)}>
      show
    </button>
  )
}


const Country = ({ country, setFilter }) => {
  console.log('menee Countryyn')
  return (
    <li>{country.name} <Button country={country} setFilter={setFilter} /> </li>
  )
}

const Countries = ({ countries, setFilter }) => {

  console.log('Countries...')

  const rows = () => countries.map(country =>
    <Country
      key={country.name}
      country={country}
      setFilter={setFilter}
    />)

  return (
    <ul>{rows()}</ul>
  )
}

const Languages = ({ country }) => {
  console.log('in Languages...')
  const languages = country.languages.map(
    language =>
      <Language
        language={language.name}
        key={language.name}
      />
  )
  return (
    <ul>{languages}</ul>
  )
}

const Language = ({ language }) => {
  console.log('in Language...')
  return (
    <li>{language}</li>
  )
}

const Weather = ({ weather }) => {
  console.log('in Weather...', weather)
  if (weather.length === 0)
    return null

  return (
    <div>
      <p>temperature: {weather.current.temperature} c</p>
      <p>wind: {weather.current.wind_speed} km/h</p>
    </div>
  )
}

const WeatherInfo = ({ searchWeather, city }) => {
  searchWeather(city)
  return (<p></p>)
}

function App() {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])



  const searchWeather = ({ city }) => {
    if (weather.length !== 0 && weather.city == city)
      return null

    axios
      .get(`http://api.weatherstack.com/current?access_key=d03a86202c80d74d441b227812ee67ec&query=${city}`)
      .then(response => {
        console.log('response data', response.data)
        setWeather({...response.data, city})
      })
      .then(() => {
        return (
          <Weather weather={weather} />
        )
      })

    console.log('weather...', weather)


  }


  const handleFilterChange = (event) => setFilter(event.target.value)

  const filterResults = countries
    .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  const rows = () => {
    if (filterResults.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (filterResults.length === 1) {
      const country = filterResults[0]
      const city = country.capital
      console.log('city...', city)
      searchWeather({ city })
      return (
        <div>
          <h1>{country.name}</h1>

          <p>capital {country.capital}
            <br />population {country.population}</p>

          <h2>languages</h2>
          <Languages country={country} />
          <p></p>
          <img src={country.flag} width='300' alt='' ></img>
          <p>Weather in {city}</p>
          <Weather weather={weather} />
        </div>
      )
    } else {
      return (
        <div>
          <Countries countries={filterResults} setFilter={setFilter} />
        </div>
      )
    }
  }

  return (

    <div>
      <p>
        Moi
    </p>

      <form>
        <div>find countries:
        <input value={filter}
            onChange={handleFilterChange} />
        </div>
      </form>
      <div>{rows()}</div>

    </div>

  )
}

export default App;
