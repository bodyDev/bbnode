/*
    BodyBeat Login Module v 0.0.1
    By Behran Kankul 07.01.2016
*/
/* Module Defaults */
var express = require("express");
var moment = require("moment");
var pg = require('pg');
var defs = require('../config/appDefaults.js');

var routes = function(){

/* Module Setup */
  var loginRouter = express.Router();
    
    //default login route
    loginRouter.route("/")
        .get(function(req,res){
             res.status(200).send('Welcome!'); 
        })
        .post(function(req,res){
            
            console.log("1. Request parsing at:" + getTime());
            
            // 1. req parsing. Determine which login way.
            /*var loginReqData = {
                    password:req.body.password,
                    email: req.body.email
            };*/
             res.status(200).send('Server error');
             res.end();
            
        });
        
        return loginRouter;
};
/* module export */
module.exports = routes;

/* Helper methods */
function getTime(){
	return new Date().toLocaleString();
}