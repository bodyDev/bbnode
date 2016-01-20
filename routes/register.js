/*
    BodyBeat Login Module v 0.0.1
    By Behran Kankul 07.01.2016
    
    This module handles registration process.
    
*/
/* Module Defaults */
var express = require("express");
var moment = require("moment");
var pg = require('pg');
var defs = require('../config/appDefaults.js');

var routes = function(){

/* Module Setup */
  var registerRouter = express.Router();
    
    //default login route
    registerRouter.route("/")
        .get(function(req,res){
             res.status(200).send('Welcome!'); 
        })
        .post(function(req,res){

            // default variables
            var response; //this is our response object
            var results = []; //container for database data
            
            console.log("1. Request parsing at:" + getTime());
            
            // 1. req parsing. Determine which login way.
            var reqData = {
                    name: req.body.name,
                    surname: req.body.surname,
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password:req.body.password,
                    facebookId: req.body.facebookId,
                    googleplusid:req.body.googleplusid,
                    twitterid:req.body.twitterid,
                    accessToken: req.body.accesstoken,
                    gender: req.body.gender,
                    birthday: req.body.birthday,
                    oauthToken: '',
                    deviceinfo: req.body.device,
                    registeredOn:getTime(),
                    osInfo:req.body.osInfo,
                    language: req.body.language,
                    type_id: req.body.typeid,
                    height: req.body.height,
                    weight: req.body.weight,
                    bodyType: req.body.bodyType,

            };
            
            // 2. create a db connection
            pg.connect(defs.databaseUrl, function (err, client, done) {
               console.log("2. create connection at:" + getTime());
               
                 // 3. new user add
                
                console.log("3.  new user add at:" + getTime());

                //SQL Query > Insert Data
                var query = client.query(
                    "INSERT INTO Users(name,surname,fullname,email,password,facebookid,googleplusid,twitterid,accesstoken,gender,birthday,oauthtoken,deviceinfo,registeredon,language,typeid,height,weight,osinfo,bodytype) "
                    + " values($1, $2,$3, $4,$5, $6,$7, $8,$9, $10,$11, $12,$13, $14, $15, $16, $17, $18, $19, $20)",
                    [reqData.name, reqData.surname ,reqData.fullname, reqData.email,reqData.password ,reqData.facebookId,reqData.googleplusid, reqData.twitterid, 
                     reqData.accessToken, reqData.gender,reqData.birthday, reqData.oauthToken,reqData.deviceInfo,reqData.registeredOn, reqData.language,
                     reqData.type_id,reqData.height,reqData.weight,reqData.osInfo,reqData.bodyType ]);

                query.on("row", function (row) {
                    results.addRow(row);
                });

                query.on("end", function () {
                    done();
                    client.end();
                    returnDataToClient();
                });
                
            
                //if something goes wrong 
                if (err) {
                    console.log(err);
                    res.status(500).send('Server error');
                    res.end();
                }
            });
              // 5. its time to send data to device
            var returnDataToClient = function () {
                console.log("5. Return at:" + getTime());

                // prepare response
                response = prepareResponseData(results[0].toString());

                console.log('Response ready to go at:' + getTime());

                return res.json({
                    "responseDate": moment().format('llll'), "responseType": "login", "data": response
                });
            }
        });
        
        return registerRouter;
};
/* module export */
module.exports = routes;

/* Helper methods */
function prepareResponseData(appUserId) {
    var loginResponse = {
        "appUserId": appUserId
    };
    return loginResponse;
}
function getTime(){
	return new Date().toLocaleString();
}