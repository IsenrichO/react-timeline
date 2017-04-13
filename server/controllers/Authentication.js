'use strict';
const JWT = require('jwt-simple'),
      User = require('../../db/models/User');


const genTimestamp = () => new Date().getTime(),
      genUserToken = (user) => JWT.encode({
        sub: user.id,         // `sub`: Subject
        iat: genTimestamp()   // `iat`: Issued At Time
      }, process.env.JWT_SECRET);

exports.signup = function(req, res, next) {
  const { firstName, lastName, email, password } = req.body;

  // Short-circuit out of function execution if required fields are left unfilled:
  if (!(email && password)) {
    const errMsg = (!email && !password
      ? 'Some fields were left blank!'
        : !email && password
      ? 'An email address is required!'
        : email && !password
      ? 'A password is required!'
        : 'Some of your data is not valid!');

    res.status(422).send(errMsg);
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    // If a user having the provided email already exists, throw error:
    if (existingUser) {
      res
        .send(422)
        .send({ error: 'An account with that email address already exists!' });
    }

    // If a pre-existing record can't be found, create and save new user record:
    const newUser = new User({ firstName, lastName, email, password })
      .save()
      .then(() => res.json({ token: genUserToken(newUser) }))
      .catch(err => next(err));
  });
};
