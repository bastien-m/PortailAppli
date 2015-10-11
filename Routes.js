module.exports = function(app) {

  app.route('/project(/:id)?')
    .get(app.Authenticate.isAuthenticated, app.Controllers.ProjectController.get)
    .put(app.Authenticate.isAuthenticated, app.Controllers.ProjectController.update)
    .delete(app.Authenticate.isAuthenticated, app.Controllers.ProjectController.delete);
};
