module.exports = function(app) {
  //allow CORS
  app.use(function(req, res, next) {
    console.log('use custom middlewar');
    res.header("Access-Controll-Allow-Origin", "*");
    res.header("Access-Controll-Allow-Header", "X-Requested-With");
    next();
  });

  app.route('/project(/:id)?')
    .get(app.Controllers.ProjectController.get)
    .post(app.Authenticate.isAuthenticated, app.Controllers.ProjectController.create)
    .put(app.Authenticate.isAuthenticated, app.Controllers.ProjectController.update)
    .delete(app.Authenticate.isAuthenticated, app.Controllers.ProjectController.delete);
};
