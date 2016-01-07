/*
	BodyBeat Server 0.0.1
    By Behran Kankul - 07.01.2015
    
    Available Modules
    - Welcome (default)
    - Login
    
*/

/* Server defaults */

var express = require("express"),
	bodyParser = require("body-parser"),
	morgan = require('morgan');
    
var app = express();
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));

/* App routing */
app.get('/', function (req, res) {
  res.send('Hello World!');
});


/* Server start */
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});