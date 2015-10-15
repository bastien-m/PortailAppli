module.exports = function(app) {

  return {

    get: function(req, res) {
      var connectionString = new Buffer(req.params.id, 'base64').toString('ascii');
      var login = connectionString.split(':')[0];
      var password = connectionString.split(':')[1];

      if (typeof login === 'undefined' || typeof password === 'undefined') {
        res.json({err: 'Erreur d\'identifiant'});
      }
      else {
        app.Models.UserModel.loginAuth(login, password, function(err, user) {
          res.json({err: err, user: user});
        });
      }
    }

  };

}
