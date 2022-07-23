const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port=3000 ||process.env.PORT
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
   
    res.sendFile('index.html',{root:__dirname});
});
app.post("/",function(req,res){
    const query = req.body.cityName;
const apiKey = "b407b183bee3601488c57d989521c25a";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&units=metric&appid="+apiKey+"&unit="+unit+""
https.get(url,function(response){
 //console.log(response.statusCode);
 response.on("data",function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageURL = " http://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<h1> The weather of "+query+" is " +weatherDescription+ ".</h1>");
    res.write("<h1>The temperature is:" +temp+ " degree Celcius.</h1>");
    res.write("<img src=" +imageURL+ ">");
    res.send()
 });
});
});






app.listen(port,function(){
    console.log("server is running");
});