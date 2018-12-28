const passport = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('users');
const omit = require('object.omit');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return done(null, false, { message: 'Email already in use' });
      }

      let user = new User();
      //verify email and password
      user.email = email.toLowerCase();
      user.password = user.generateHash(password);

      try {
        await user.save();
        return done(null, omit(user.toJSON(), 'password'), {
          message: 'Account successfully created.'
        });
      } catch (error) {
        return done(null, false, {
          message: 'Cannot create account, try again.'
        });
      }
    }
  )
);

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, 'User does not exist');
        }
        if (user.validatePassword(password)) {
          return done(null, user);
        } else {
          return done('Wrong credentials');
        }
      });
    }
  )
);
