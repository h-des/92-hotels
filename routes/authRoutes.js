const passport = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('users');

module.exports = app => {
  //signup
  app.post('/auth/signup', (req, res, done) => {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return res.status(401).send(info);
      }
      res.status(200).send(user);
    })(req, res, done);
  });
};
