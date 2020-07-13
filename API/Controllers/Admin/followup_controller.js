var mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;

var StudentFollowups = mongoose.model("StudentFollowup");

module.exports.get_all = function (req, res) {
  StudentFollowups.find().exec(function (err, response) {
    if (err) {
      console.log("err");
      res.status(400);
      res.json(error);
    } else {
      res.status(200);
      res.json(response);
    }
  });
};
