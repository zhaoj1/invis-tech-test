const fetch = require("node-fetch")
require('dotenv').config()
const moment = require('moment-timezone')

function logTimeWeather(input){
  geocodeAPICall(input)
}

async function geocodeAPICall(input){
  let response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${input}&key=` + process.env.REACT_APP_OCD_API_KEY).then(resp => resp.json())
  let timezoneInfo = await response.results[0].annotations.timezone.name
  let now = moment(new Date())
  console.log('Current Time: ', now.tz(timezoneInfo))
}



logTimeWeather(
  'new york, ny 10004'
)