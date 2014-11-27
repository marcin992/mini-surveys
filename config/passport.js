/**
 * Created by Marcin on 2014-08-20.
 */

var LocalStrategy = require('passport-local').Strategy;
var User = require('../database/models/User');
var Message = require('../utils/Messages');

module.exports = function(passport, userProvider) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    userProvider.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done) {
    process.nextTick(function() {
      userProvider.getUserByEmail(email, function(err, user) {
        if(err)
          return done(err);

        if(user) {
          return done(null, false, req.flash('signupMessage', Message.EMAIL_TAKEN.en));
        } else {
          userProvider.addUser(email, password, function(err, newUser) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done) {
    userProvider.getUserByEmail(email, function(err, user) {
      if(err)
        return done(err);

      if(!user)
        return done(null, false, req.flash('loginMessage', Message.NO_USER.en));

      if(!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', Message.WRONG_PASSWORD.en));

      if(!user.isActive)
        return done(null, false, req.flash('loginMessage', Message.NO_ACTIVE.en));

      return done(null, user);
    });
  }));
};