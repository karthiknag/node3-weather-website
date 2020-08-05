const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2FydGhpazc3IiwiYSI6ImNrYjY2OWE2YTB2NTAyeW16aWVzY2N3MWwifQ.Tfn887YoJLvWnHYxrwhYRA&limit=5' 
    
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to Location services', undefined)
        } else if (!body.features || body.features.length === 0) {
            callback('Unable to find location. Try again with different search criteria.', undefined)
        } else {
            const relevantLocData = body.features[0]
            callback(undefined, {
                latitude: relevantLocData.center[1],
                longitude: relevantLocData.center[0],
                location: relevantLocData.place_name
            })
        }
    })
}

module.exports = geocode