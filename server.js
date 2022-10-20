if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const FORECAST_API_KEY = process.env.FORECAST_API_KEY
const axios = require('axios')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.static('public'))

app.post('/weather', (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://yahoo-weather5.p.rapidapi.com/weather',
        params: {
            lat: req.body.latitude,
            long: req.body.longitude,
            format: 'json',
            u: 'c'
        },
        headers: {
            'X-RapidAPI-Key': process.env.FORECAST_API_KEY,
            'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        //With this i pass de info tu my script
        res.json(response.data.current_observation)
    }).catch(function (error) {
        console.error(error);
    });

    // axios.request(options).then(function (response) {
        
    // }).then(data => res.json(data.response.data))


    console.log(req.body)
})

app.listen(port, () => {
    console.log('Server Started')
})
