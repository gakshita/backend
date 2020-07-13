var accountSid = "AC82e72ddf2afbe0d3503bc852d5e92bca"; // Your Account SID from www.twilio.com/console
var authToken = "4882448e832a02dabe1d8c7e36f43e8a";

var mongoose = require("mongoose");
var Users = mongoose.model("User");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
var twilio = require("twilio");
var client = new twilio(accountSid, authToken);

module.exports.get_all = function (req, res) {
  console.log("usesr");
  Users.find({ type: "user" }).exec(function (err, response) {
    if (err) {
      console.log("error");
    }
    res.json(response);
  });
};

module.exports.register = function (req, res) {
  console.log("registration");
  var username = req.body.username;
  var name = req.body.name;
  var password = req.body.password;

  if (!username || !name || !password) {
    res.status(200);
    res.json({ success: false, message: "All fields are required !" });
  } else {
    Users.create(
      {
        username: username,
        name: name,
        password: bcrypt.hashSync(password, 10, function (err, hash) {
          // Store hash in your password DB.
          if (err) {
            console.log("err", err);
          } else {
            console.log(hash, "password");
          }
        }),
      },
      function (err, user) {
        if (err) {
          console.log("err");
          res.status(200);
          res.json({ success: false, message: "Username already exists !" });
        } else {
          console.log("user created", user);
          res.status(200);
          res.json({ success: true });
        }
      }
    );
  }
};

module.exports.login = function (req, res) {
  console.log("login");
  var username = req.body.username;
  var password = req.body.password;

  Users.findOne({ username: username }).exec(function (err, user) {
    if (err) {
      console.log("err");
      res.status(400);
      res.json(err);
    } else if (!user) {
      console.log("user doesnot exist");
      res.status(200);
      res.send({ success: false });
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        var token = jwt.sign({ username: username }, "shhhh");
        console.log("user found", user);

        res.status(200);
        res.json({ success: true, token: token, type: user.type });
      } else {
        res.status(200);
        res.send({ success: false });
      }
    }
  });
};

module.exports.authenticate = function (req, res, next) {
  console.log("authenticating");
  var header_exists = req.headers.authorization;
  if (header_exists) {
    var token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "shhhh", function (err, decoded) {
      if (err) {
        console.log("error");
        res.status(401);
        res.json("unathorized");
      } else {
        req.user = decoded.username;
        console.log("authorized");
        next();
      }
    });
  } else {
    res.status(403);
    res.json("no token provided");
  }
};

module.exports.send_mail = function (req, res) {
  console.log(req.body, "mailll ");
  // console.log(typeof req.body.receiver_mail);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "goyalakshitaa@gmail.com",
      pass: "akshitagoyal15",
    },
  });

  var mailOptions = {
    from: "goyalakshitaa@gmail.com",
    to: req.body.detail,
    subject: "subject",
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(200);
      res.json({ success: false, message: "Message not sent !" });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true });
    }
    res.end();
  });
};

module.exports.send_sms = function (req, res) {
  client.messages
    .create({
      body: "Hello from Node",
      to: "+916350585006", // Text this number
      from: "+17605136388", // From a valid Twilio number
    })
    .then((message) => res.json({ success: true }))
    .catch((error) => res.send(error));
};

module.exports.send_call = function (req, res) {
  client.calls
    .create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: "+916350585006", // Text this number
      from: "+17605136388",
    })
    .then((call) => res.send("call sent"))
    .catch((error) => res.send(error));
};

module.exports.send_whatsapp = function (req, res) {
  console.log("hii whatsapp", req.body);

  if (!req.body.message) {
    res.json({ success: false, message: "select a template" });
  } else {
    client.messages
      .create({
        body: "Your appointment is coming up on July 21 at 3PM",
        from: "whatsapp:+14155238886",
        to: `whatsapp:+91${req.body.detail}`,
      })
      .then((message) => res.json({ success: true }))
      .done();
  }
};
