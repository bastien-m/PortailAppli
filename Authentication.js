var passport = require('passport')
,BasicStrategy = require('passport-http').BasicStrategy;

module.exports = function(app) {


  passport.use(new BasicStrategy(
    function(username, password, done) {
      app.Models.UserModel.loginAuth(username, password, function(err, user) {
        if (err) {
          app.winston.info('error login : %s, %s', username, password);
          return done(err);
        }
        else {
          return done(null, user);
        }
      });
    }));

  //bind passport to express
  app.use(passport.initialize());
  //enable isAuthenticated method in order to use it inside router
  app.Authenticate = {};
  app.Authenticate.isAuthenticated = passport.authenticate('basic', { session : false });

}
