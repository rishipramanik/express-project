const express = require("express");
const app = express();
const UserHandler = require("./handler/userHandler");
const GeneralValidator = require("./validators/general");
const authValodator = require("./validators/auth");
const Roles = require('./constants/roles')

const portNo = 3000;

// app.get('/', (req, res) => {
//     console.log(`Query = ${JSON.stringify(req.query)}`)
//     console.log(`IP Address = ${req.ip}`)
//     console.log(`Headers = ${JSON.stringify(req.headers)}`)
//     res.send('Hello')
// })

app.use(function (req, res, next) {
  console.log("Request Received at" + Date.now());
  console.log("Method" + req.method + "Url" + req.url);
  next();
});

// app.use(function(req, res, next) {
//   console.log('Inside 2nd')
//   next();
// })

app.post(
  "/login",
  UserHandler.login,
  GeneralValidator.validate(["email", "password"]),
  UserHandler.login
);
app.get(
  "/signup",
  GeneralValidator.validate(["name", "email", "password"]),
  UserHandler.signup
);
app.get("/profile", 
authValodator.checkIfLoggedIn, 
authValodator.checkIfAuthorized([Roles.Admin, Roles.Student]), 
UserHandler.getProfile);

app.listen(portNo, () => {
  console.log(`running on ${portNo}`);
});
