const request = require('request');

var getForecast = (lat, lng, callback) => {
    request({
        url:`https://api.forecast.io/forecast/59a2dab019b5fcbcec26aa2ddda9be82/${lat},${lng}`,
        json: true
    }, (err, res, body) => {
        if (err) {
            callback('Unable to connect to server')
        } else if (!err && res.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                feelTemperature: body.currently.apparentTemperature
            });
        }
    });
};

module.exports.getForecast = getForecast;