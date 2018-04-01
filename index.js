var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');


var pdfRoutes = require('./routes/pdf');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/api/pdf', pdfRoutes);

//probebly parser will be here
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res){
    res.sendFile("index.html");
});

app.get('/happy', function(req, res){
    res.send(":)");
});

app.get('/about', function(req, res){
    res.send("Farhad Heidari");
});

app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + port);
});