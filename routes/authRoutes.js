/**
 * Created by Marcin on 2014-08-30.
 */

module.exports = function (passport) {
  return {
    loginView: function (req, res) {
      res.render('login.jade', {
        message: req.flash('loginMessage'),
        title: "Login"
      });
    },

    login: passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
      }),

    signupView: function (req, res) {
      res.render('signup.jade', {
        message: req.flash('signupMessage'),
        title: "Sign up"
      });
    },

    signup: passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
      }),

    logout: function (req, res) {
      req.logout();
      res.redirect('/');
    }
  }
}