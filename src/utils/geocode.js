const request = require('request');


const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGV2a2V6YTg3OSIsImEiOiJjanZodXR4MGkwNmdjNGFtOTA2a3huOXVlIn0.508Td6Wrb0UZt7HC06423g&limit=1';    

    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to network',undefined); // second parameter is undefined
        } else if(body.features.length < 1){
            callback('Unable to find data for searching',undefined);
        } else {

            const data = {
                placeName: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            };

            callback(undefined,data);
        }
        
    });

};



module.exports = geocode;