const request = require('request')



const forecast = (latitude ,longitude,callback) =>{
    const url = 'http://api.weatherapi.com/v1/current.json?key=0c9b2bf9adef43698b4202243212211&q='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to Location services!',undefined)

        }else if(body.error){
            callback('Code Message: '+body.error.message,undefined)
        }
        else{
            callback(undefined,{
                 location: body.location.name,
                 temp_degree:body.current.temp_c,
                 precip:body.current.precip_in,
                 condition:body.current.condition.text,
                 humidity:body.current.humidity
            })
        }
    })
}



module.exports = forecast