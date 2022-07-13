function validate(params) {
  return function (req, res, next) {
    console.log("Inside validator");
    // let name = req.query.name;
    // let email = req.query.email;
    // let password = req.query.password;
    for (let i = 0; i < params.length; i++) {
      let param = params[i];
      if (!req.query[param]) {
        res.status(400).send(`${param} is not present`);
        return;
    
      }
    }
    if (!name) {
      res.status(400).send("Name is not there");
    }
    if (!email) {
      res.status(400).send("Email is not there");
    }
    if (!password) {
      res.status(400).send("Password is not there");
    }
    next();
  };
}

module.exports = {
  validate,
};
