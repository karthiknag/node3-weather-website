const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=92711f87840886ca064597923a1aeddb&units=f&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to Weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const currentWeather = body.current
            callback(undefined, 
                currentWeather.weather_descriptions[0] + '. The current temperature is ' + currentWeather.temperature + ' degrees out. It feels like '+ currentWeather.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast