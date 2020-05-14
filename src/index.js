const fetch = require("node-fetch")
require('dotenv').config()

function logTimeWeather(input){
  geocodeAPICall(input)
}

async function geocodeAPICall(input){
  let response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${input}&key=` + process.env.REACT_APP_OCD_API_KEY).then(resp => resp.json())
  let timeZone = await response.results[0].annotations.timezone
  console.log(timeZone)
}

logTimeWeather(
  'new york, ny 10004'
)