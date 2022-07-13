const UserService = require("../service/userService");

function login(req, res) {
  let email = req.query.email;
  let password = req.query.password;

  UserService.login(email, password).then(result => {
    if (result.status === true) {
      res.status(200).send(result.token);
    } else {
      res.status(401).send(result.error);
    }
  })
  .catch(error => {
    res.status(400).send(error)
  })
}

function signup(req, res) {
  res.status(200).send('Inside Signup handler')
}

function getProfile(req, res) {
  res.status(200).send(req.user)
}

module.exports = {
  login,
  signup,
  getProfile
};
