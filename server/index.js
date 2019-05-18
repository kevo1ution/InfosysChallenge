var express = require('express');
var url = require('url');
var request = require('request');
var uuid = require('uuid/v4');
var DataBase = require('./database.js');
var cleanup = require('./cleanup.js');

//create express app
var app = express();
app.use(express.urlencoded())
var server = app.listen(8001, function(){
    console.log("server is listening in 8001");
});

app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/index.html");
});

app.get('/search', (req, res) =>{
    res.sendFile(__dirname + '/search.html')
});

app.get('/main.css', (req, res)=>{
    res.sendFile(__dirname + "/main.css");
})

app.get('/frontjs/index.js', (req, res)=>{
    res.sendFile(__dirname + "/frontjs/index.js");
});

//submit forms
app.post('/submit', (req, res)=>{
    console.log(req.body);
    DataBase.addReq(req.body, function(doc){
        res.redirect('/')
    });
});

//request previous forms
app.post('/getinfo', (req, res)=>{
    console.log(req.body);
    DataBase.getReq(req.body.key, req.body.value, (docs)=>{
        res.json(docs)
    });
})

//cleaning up
cleanup.Cleanup(function(){
	console.log("cleaning up");
	DataBase.closeDB();
});
