var mongoose = require("mongoose");

var dburl = "mongodb://localhost:27017/studentbigdata";

mongoose.connect(dburl);

mongoose.connection.on("connected", function () {
  console.log("connected to", dburl);
});

mongoose.connection.on("disconnected", function () {
  console.log("disconnected to", dburl);
});

mongoose.connection.on("error", function () {
  console.log("error at", dburl);
});

process.on("SIGINT", function () {
  mongoose.conntion.close(function () {
    console.log("mongoose disconnected through act termination", dburl);
    process.exit(0);
  });
});

//Categories
var Students = require("./../API/Models/category_model");

//Masters
var Campaigns = require("./../API/Models/master_model");
var Categories = require("./../API/Models/master_model");
var Cities = require("./../API/Models/master_model");
var Locations = require("./../API/Models/master_model");
var Educations = require("./../API/Models/master_model");
var Streams = require("./../API/Models/master_model");
var Colleges = require("./../API/Models/master_model");
var References = require("./../API/Models/master_model");
var Sms_templates = require("./../API/Models/master_model");
var Mail_templates = require("./../API/Models/master_model");
var Status = require("./../API/Models/master_model");
var Whatsapp_templates = require("./../API/Models/master_model");

//Followups
var StudentFollowups = require("./../API/Models/category_followup_model");

//Tasks
var Tasks = require("./../API/Models/tasks_model");

//Users
var Users = require("../API/Models/users_model");
