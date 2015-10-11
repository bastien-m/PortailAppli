var passport = require('passport')
,BasicStrategy = require('passport-http').BasicStrategy;

module.exports = function(app) {

  passport.use(new BasicStrategy(
    function(username, password, done) {
      (function() {
        app.Models.UserModel.login(username, password)
        .then(function(user) {
          app.winston.log('user found');
          app.winston.log(user);
          if (user.length == 1) {
            app.winston.log('found');
            return done(null, user);
          }
          else {
            app.winston.log('not found');
            return done(null, false, { message: 'Aucun utilisateur trouvé'});
          }
        }, function(err) {
          app.winston.log(err);
          app.winston.log('something went wrong');
          return done(null, false, { message: err});
        })();
      });
      console.log('begin auth');
      //retrieve a promise with user or error

      console.log('end auth');
    }));

  //bind passport to express
  app.use(passport.initialize());
  //enable isAuthenticated method in order to use it inside router
  app.Authenticate = {};
  app.Authenticate.isAuthenticated = passport.authenticate('basic', { session : false });

}
