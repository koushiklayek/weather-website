const request = require("request")

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=9331ad4859318d932f0f57bad65fdb6c&query=" + lat + "," + long + "&units=m"
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather server",undefined)
        }
        else if (body.error) {
            callback("Unable to find location",undefined)
        }
        else {
            callback(undefined,"I'm in " + body.location.name + ". It's " + body.current.weather_descriptions[0] + " here. Current temperature is " + body.current.temperature + " degree out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })
}

module.exports = forecast