console.log('Client side javascript is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent= 'From JavaScript'


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+ location).then ((response)=> {
        response.json().then((data)=> {
            if(data.error){
                messageOne.textContent = data.error
            } else{
                messageOne.textContent =  data.location
                messageTwo.textContent = "The tempreture in "+data.forecast.location + ', ' + data.location + ' is '+ data.forecast.temp_degree +' Degree' + ', There is '+ data.forecast.precip +'% chance of rain.'
                console.log(data.forecast) 
            }
        })
    })
})