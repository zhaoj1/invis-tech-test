const fetch = require("node-fetch")
require('dotenv').config()
const moment = require('moment-timezone')

function logTimeWeather(input){
  geocodeAPICall(input)
}

function logTime(timezoneInput){
  let now = moment(new Date())
  console.log('Current Time: ', now.tz(timezoneInput).format('MMMM Do YYYY, h:mm:ss a'))
}

async function weatherAPICall(latlon){
  const weatherResp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lng}&units=imperial&appid=` + process.env.REACT_APP_OWM_API_KEY)
  .then(data => {
    if(data.status == 200){
      return data.json()
    }else if(data.status == 400){
      throw new Error('Something went wrong. Please try again.')
    }
  })

  const weatherInfo = await weatherResp.main.temp
  console.log('Temp: ', Math.round(weatherInfo) + '\xB0F' )
}

async function geocodeAPICall(input){
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${input}&key=` + process.env.REACT_APP_OCD_API_KEY).then(resp => resp.json())
  let timezoneInfo = await response.results[0].annotations.timezone.name
  let latlon = await response.results[0].geometry
  console.log('Input: ', response.results[0].formatted)
  logTime(timezoneInfo)
  weatherAPICall(latlon).catch(error => console.log(error))
}

logTimeWeather(
  'new york, ny 10004'
)
