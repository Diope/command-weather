const request = require('request');

var geocodeAddress = (address) => {

    var encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (err, res, body) => {
        if (err) {
            console.log('Unable to connect to server.')
        } else if (body.status === 'ZERO_RESULTS') {
            console.log('Unable to find that location.');
        } else if (body.status === 'OK'){
            console.log(`Address: ${body.results[0].formatted_address}`);
            console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
        }
        
    })

};

module.exports.geocodeAddress = geocodeAddress;