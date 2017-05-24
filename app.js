const yargs = require('yargs');

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

geocode.geocodeAddress(argv.address, (err, results) => {
    if (err){
        console.log(err);
    } else {
        console.log(results.address);
        forecast.getForecast(results.latitude,results.longitude, (err, weatherResults) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`It's currently ${weatherResults.temperature}°F, and feels like ${weatherResults.feelTemperature}°F`);
            }
        });
    }
});


