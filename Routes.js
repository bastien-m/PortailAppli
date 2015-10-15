module.exports = function(app) {
  //allow CORS
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });


  app.route('/user(/:id)?')
    .get(app.Controllers.UserController.get);

  app.route('/project(/:id)?')
    .get(app.Controllers.ProjectController.get)
    .post(app.Authenticate.isAuthenticated, app.Controllers.ProjectController.create)
    .put(app.Authenticate.isAuthenticated, app.Controllers.ProjectController.update)
    .delete(app.Authenticate.isAuthenticated, app.Controllers.ProjectController.delete);
};
