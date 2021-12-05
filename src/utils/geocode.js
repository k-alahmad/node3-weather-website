const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia2FuYWFuOTEiLCJhIjoiY2t2aWdicTM2MGMwbDJ2dGszOXpvMWI4OCJ9.LNmyhjFeS4k_wEb6yVOYmg&limit=1'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to Location services!',undefined)

        }else if(body.features.length ==0){
            callback('Unable to Find location! try another search.',undefined)
        }
        else{
            callback(undefined,{
                 latitude :body.features[0].center[1],
                 longitude: body.features[0].center[0],
                 location: body.features[0].place_name

            })
        }
    })
}



module.exports = geocode