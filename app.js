const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const location = req.body.cityName;
    const units = "metric";
    const apiKey = "7b9590c76821a66ed8a40a1a07a1fac2";
    
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ location + "&unit=" + units+ "&appid=" + apiKey;
    
    https.get(url, function (response) {
        // console.log(response.statusCode);
    
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
    
            res.write("<p>The weather is currently " + desc + "<p>");
            res.write("<h1>The temperature in "+ location +" is " + temp + "Degree Celsius</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    
    })
    
    
});


app.listen("3000", function () {
    console.log("Server is running on port 3000")
})