const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find address');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.forecast.io/forecast/59a2dab019b5fcbcec26aa2ddda9be82/${lat},${lng}`
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var feelTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}°F, and feels like ${feelTemperature}°F`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers');
    } else {
        console.log(e.message);
    }
});