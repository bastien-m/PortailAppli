module.exports = function(app) {

  return {

    get: function(req, res) {
      app.winston.log(req.user);
      res.json({msg: 'get project'});
    },
    create: function(req, res) {
      res.json({msg: 'create project'});
    },
    update: function(req, res) {
      res.json({msg: 'update project'});
    },
    delete: function(req, res) {
      res.json({msg: 'delete project'});
    }

  }

}
