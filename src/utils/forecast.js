const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const lat = encodeURIComponent(latitude)
    const lon = encodeURIComponent(longitude)

    const url = 'http://api.weatherstack.com/current?access_key=3da8e6c6212eccde039128678796a0e7&query=' + lat + ',' + lon + '&units=m'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(body.error.code + '. Unable to find location!', undefined)
        } else {
            const cur = body.current
            callback(undefined, cur.weather_descriptions[0] + ". It is currently " + cur.temperature + ' degrees out. It feels like ' + cur.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast