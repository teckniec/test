// Global variables
let sYear = "2018";
let sMonth = "01";
let sDay = "01";
let dateObj = new Date();
let eMonth = dateObj.getUTCMonth() + 1; //months from 1-12
let eDay = dateObj.getUTCDate();
let eYear = dateObj.getUTCFullYear();
let key = "eS6qfDZDKtwmh83Q5oGPjIyiUL3so4NOGVV2ixSH";
const solarSearch = "https://api.nasa.gov/DONKI/FLR?startDate=" + sYear + '-' + sMonth + '-' + sDay + "&endDate=" + eYear + '-' + eMonth + '-' + eDay + "&api_key=" + key;

//Require
const request = require('request');
const cron = require('node-cron');
const express = require('express');
let app = express();
var fs = require('fs');

//Connection to database
let mysql = require('mysql');
const con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'balla456',
  database : 'ra_db'
});
 
con.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + con.threadId);
});



//  Function for adding API data to table
//nasaSearch = function() {
  request(solarSearch, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
    var index;
    for (index = 0; index < body.length; ++index) {

       var content = JSON.stringify(body);
      fs.writeFile("test.json", content, function(err) {
        if (err) {
            console.log(err);
        }});

     // console.log(
       //var jsonData =  body;
     //  body[index].beginTime,
    //   body[index].endTime,
    //   body[index].peakTime,
  //    body[index].classType);
 // var body = jsonData
//var beginTime = JSON.stringify(body[index].beginTime);
//var peak = JSON.parse(body[index].peakTime);
//var classType =  body[index].classType;

var sql = "INSERT INTO solar_data (start, end, peak, class) VALUES (key, endTime, peak, classType)";
    con.query(sql, function (err, result) {
     if (err) throw err;
     console.log("1 record inserted");
        });
       // con.end();
      
      }
    });


/*
// Cron job for checking nasa API for new objects
cron.schedule('0 1 * * *', () => {
  console.log('Runing a job at 01:00 at America/Los_Angeles');
  nasaSearch();
}, {
  scheduled: true,
  timezone: "America/Los_Angeles"
});

*/


