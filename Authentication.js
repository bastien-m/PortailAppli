var passport = require('passport')
,BasicStrategy = require('passport-http').BasicStrategy;

module.exports = function(app) {

  passport.use(new BasicStrategy(
    function(username, password, done) {
      //retrieve a promise with user or error
      app.Models.UserModel.login({ login: username, password: password })
      .then(function(user) {
        console.log('user found');
        console.log(user);
        if (user.length == 1) {
          console.log('found');
          return done(null, user);
        }
        else {
          console.log('not found');
          return done(null, false, { message: 'Aucun utilisateur trouvé'});
        }
      }, function(err) {
        console.log(err);
        console.log('something went wrong');
        return done(null, false, { message: err});
      });
    }));

  //bind passport to express
  app.use(passport.initialize());
  //enable isAuthenticated method in order to use it inside router
  app.Authenticate = {};
  app.Authenticate.isAuthenticated = passport.authenticate('basic', { session : false });

}
