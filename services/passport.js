const passport = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('users');

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
      console.log(existingUser);
      if (existingUser) {
        return done(null, false, { message: 'Email already in use' });
      }

      let user = new User();
      user.email = email;
      user.password = user.generateHash(password);

      try {
        await user.save();
        return done(null, user, { message: 'Account successfully created.' });
      } catch (error) {
        return done(null, false, {
          message: 'Cannot create accoun, try again.'
        });
      }
    }
  )
);
