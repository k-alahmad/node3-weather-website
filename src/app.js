const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//Define paths for express config
const app = express()
const port = process.env.PORT || 3000
const viewPath = path.join(__dirname,'../template/views')
const publicDirctroyPath=path.join(__dirname,'../public')
const partialsPath =  path.join(__dirname,'../template/partials')
//setup handelbars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirctroyPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Kanaan Alahmad'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Kanaan Alahmad'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Get Help',
        message:'This is a help message',
        name:'Kanaan Alahmad'
    })
})


app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
    
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                })
        }) 
    })
}) 
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search) 
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Erorr: 404 ',
        errorMessage:'Error: Help Article was not Found!',
        name:'Kanaan Alahmad'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'Erorr: 404',
        errorMessage:'Page was not Found!',
        name:'Kanaan Alahmad'
    })
}) 

app.listen(port, ()=>{
    console.log('server started on port '+port)
})