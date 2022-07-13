const jwt = require("jsonwebtoken");
const UserAccessor = require("../accessor/userAccessor");
const secretKey = "sagyafdjskdvgkuy";

function checkIfLoggedIn(req, res, next) {
  let headerString = req.headers["authorization"];
  console.log(`headerString = ${headerString}`);
  if (!headerString || headerString.length === 0) {
    res.status(401).send("Unauthenticated");
    return;
  }
  let splitHeaderString = headerString.split(" ");
  if (splitHeaderString.length < 2) {
    res.status(401).send("Unauthenticated");
    return;
  }
  let token = splitHeaderString[1];
  console.log(`token = ${token}`);
  try {
    let payload = jwt.verify(token, secretKey);
    UserAccessor.fetchUserInfo(payload.email)
      // console.log(`payload = ${JSON.stringify(payload)}`);
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => {
        console.log(`Error while fetching user! ${error}`);
        res.status(401).send("Not Authenticated!");
        return;
      });
  } catch (err) {
    console.log(`error = ${err}`);
    res.status(401).send("Unauthenticated");
    return;
  }
}

function checkIfAuthorized(allowedRoles) {
  return function (req, res, next) {
    if (!req.user) {
      res.status(403).send("Acces Denied!");
      return;
    }
    let userRole = req.user.role;
    let isAuthorized = false;
    for (let i = 0; i < allowedRoles.length; i++) {
      if (allowedRoles[i] === userRole) {
        isAuthorized = true;
        break;
      }
    }

    if (!isAuthorized) {
      res.status(403).send("Access Denied");
    } else {
      next();
    }
  };
}

module.exports = {
  checkIfLoggedIn,
  checkIfAuthorized,
};
