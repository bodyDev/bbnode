/*
	BodyBeat Server 0.0.1
    By Behran Kankul - 07.01.2016
    
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
// Views
app.get('/', function(request, response) {
  response.render('pages/index');
});
// Check Server runs?
// v1
app.get('/api/v1/status',function(req,res){
	var responseJson = {status :"Server runs ok"};
	res.json(responseJson);
});
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


/* Server start */
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Bodybeat is here! http://%s:%s', host, port);
});