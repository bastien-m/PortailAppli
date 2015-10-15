module.exports = function(app) {

  app.Controllers = {}

  app.Controllers.ProjectController = require('./ProjectController.js')(app)
  app.Controllers.UserController = require('./UserController.js')(app)

}
