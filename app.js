const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const DEBUG = false;
require('dotenv').config();

const API_KEY = process.env.KEY;
const API_URL = process.env.URL;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/api', (req, res) => {
    let cityName = req.body['cityName'];
    if(DEBUG === true) {
        res.send(mockObj);
    }else {
        axios({
            method: 'get',
            url: API_URL + '?q=' + cityName + '&appid=' + API_KEY
        }).then((response) => {
            res.send(JSON.stringify(response.data));
        }).catch((error) => {
            res.status(error.response.status).send(error.response.data);
        });
    }
})

app.listen(3000);

const mockObj = {
    "coord":{
        "lon":-0.13,
        "lat":51.51
    },
    "weather":[
        {
            "id":500,
            "main":"Rain",
            "description":"light rain",
            "icon":"10d"
        }
    ],
    "base":"stations",
    "main":{
        "temp":289.21,
        "feels_like":287.62,
        "temp_min":288.71,
        "temp_max":290.15,
        "pressure":1009,
        "humidity":82
    },
    "visibility":10000,
    "wind":{
        "speed":3.6,
        "deg":240
    },
    "clouds":{
        "all":100
    },
    "dt":1592476796,
    "sys":{
        "type":1,
        "id":1414,
        "country":"GB",
        "sunrise":1592451764,
        "sunset":1592511644
    },
    "timezone":3600,
    "id":2643743,
    "name":"London",
    "cod":200
};