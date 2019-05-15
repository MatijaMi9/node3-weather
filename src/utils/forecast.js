const request = require('request');

const forecast = (latitude,longitude,callback) => {

    
    const url = 'https://api.darksky.net/forecast/73f82b2081e54c3e2ef9e62ea23d2b70/' + latitude + ',' + longitude + '?units=si';
        
    request({url, json: true}, (error,{body}) => {
        
        if(error){ // low level error
            callback('Unable to connect to internet',undefined);
        } else if(body.error){
            callback('Unable to find data based on your search criteria',undefined);
        } else {
            callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out.There is a ${body.currently.precipProbability}% chance of rain`);
        }


    });

};



module.exports = forecast;