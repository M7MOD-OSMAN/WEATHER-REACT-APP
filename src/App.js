import { useEffect, useState } from 'react'
import './App.css'
import Input from './components/Input'

function App() {
  const [degrees, setDegrees] = useState(null)
  const [location, setLocation] = useState('')
  const [userLocation, setUserLocation] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [humidity, setHumidity] = useState(null)
  const [wind, setWind] = useState(null)
  const [country, setCountry] = useState('')
  const [dataFetched, setDataFetched] = useState(false)


  const fetchWeatherData = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
      )

      const data = await response.json()
      console.log(data)

      setDegrees(data.main.temp)
      setLocation(data.name)
      setDescription(data.weather[0].description)
      setIcon(data.weather[0].icon)
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setCountry(data.sys.country)

      setDataFetched(true)
    } catch (error) {
      console.log(error)
      alert('Please enter a valid location yabaa')
    }
  }

  const defaultDataFetched = async () => {
    if (!dataFetched) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=cairo&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
      )

      const data = await response.json()
      console.log(data)

      setDegrees(data.main.temp)
      setLocation(data.name)
      setDescription(data.weather[0].description)
      setIcon(data.weather[0].icon)
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setCountry(data.sys.country)
    }
  }

  useEffect(() => {
    defaultDataFetched()
  }, [])

  return (
    <div className='app'>
      <div className='weather'>
        <Input
          text={(e) => setUserLocation(e.target.value)}
          submit={fetchWeatherData}
          func={fetchWeatherData}
        />
        <div className='weather-display'>
          <h3 className='weather-location'>weather in: {location}</h3>

          <div>
            <h1 className='weather-degrees'>{degrees} °C</h1>
          </div>

          <div className='weather-description'>
            <div>
              <div className='weather-description-head'>
                <span className='weather-icon'>
                  <img
                    src={`http://openweathermap.org/img/w/${icon}.png`}
                    alt='weather icon'
                  />
                </span>

                <h3>{description}</h3>
              </div>
              <h3>Humidity: {humidity} %</h3>
              <h3>Wind Speed: {wind} m/s</h3>
            </div>

            <div className='weather-country'>
              <h3>{country}</h3>
              <h2 className='weather-date'>4/30/2022, 2:05:24 PM</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
