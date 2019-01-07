const passport = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('users');
const omit = require('object.omit');

module.exports = app => {
  //signup
  app.post('/auth/signup', (req, res, done) => {
    console.log(req.body);
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return res.status(401).send(info);
      }
      res.status(200).send(omit(user.toJSON(), 'password'));
    })(req, res, done);
  });

  app.post('/auth/login', (req, res, done) => {
    passport.authenticate('local-login', (err, user) => {
      if (err) {
        return res.status(401).send(err);
      }
      if (!user) {
        return res.status(401).send(err);
      }
      req.logIn(user, err => {
        if (err) {
          return res.status(401).send('Database error!');
        }
        return res.status(201).send(omit(user.toJSON(), 'password'));
      });
    })(req, res, done);
  });

  app.get('/auth/autoLogin', async (req, res) => {
    if (!req.user) {
      return req.status(401).send('You must log in!');
    }
    res.send(omit(req.user.toJSON(), ['password', '__v']));
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.send('Successfully logout');
  });
};
