const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2FzYWVzMDIiLCJhIjoiY2t0OGQzZGp4MTE5ZDJucGRnZ3JvNmdhaiJ9.PVOM1_qCK0uD7M3AFTbz0g&limit=1'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location! Try again with different search term.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode