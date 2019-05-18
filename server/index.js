var express = require('express');
var url = require('url');
var bodyparser = require('body-parser');
var request = require('request');
var fs = require('fs');

//create express app
var app = express();
app.use(bodyparser.json({limit: '50mb'}));
var server = app.listen(8001, function(){
    console.log("server is listening in 8001");
});

app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/index.html");
});

app.get('/frontjs/index.js', (req, res)=>{
    res.sendFile(__dirname + "/frontjs/index.js");
});

//submit forms
app.post('/submit', (req, res)=>{
    console.log(req.body);
    res.json({ success: true});
});

//request previous forms
app.post('/getinfo', (req, res)=>{

})

