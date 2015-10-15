module.exports = function(app) {

  return {

    get: function(req, res) {
      //determine whether we want a specific project or a list of all the project
      if (typeof req.params.id !== 'undefined') {
        app.Models.ProjectModel.findById(req.params.id, function(err, project) {
          if (err) {
            app.winston.error('an error occured while searching for a project %s', req.params.id);
            app.winston.error(err);
            res.json({err: 'Une erreur est survenue lors de la récupération du projet'});
          }
          else {
            res.json({err: null, projects: [project]});
          }
        });
      }
      else {
        app.Models.ProjectModel.find({}, function(err, projects) {
          if (err) {
            app.winston.error('an error occured while searching for projects');
            app.winston.error(err);
            res.json({err: 'Une erreur est survenue lors de la récupération des projets'});
          }
          else {
            res.json({err: null, projects: projects});
          }
        });
      }
    },
    create: function(req, res) {

      if (typeof req.body.name !== 'undefined'
        && typeof req.body.url !== 'undefined'
        && typeof req.body.description !== 'undefined') {
        //transform to array the stack if its not already the case
        if (typeof req.body.stack !== 'undefined' && req.body.stack.constructor !== Array) {
          req.body.stack = [req.body.stack];
        }
        new app.Models.ProjectModel({
          name: req.body.name,
          stack: req.body.stack || [],
          url: req.body.url,
          description: req.body.description || 'Aucune description fournie',
          isDone: req.body.isDone || false,
          host: req.body.host || 'Aucun serveur indiqué'
        }).save(function(err) {
          if (err) {
            app.winston.error('An error occured while persisting data for project');
            app.winston.error(err);
            res.json({err: 'Une erreur est survenue lors de la création du projet'});
          }
          else {
            res.json({err: null, msg: 'Projet sauvegardé'});
          }
        });
      }
      else {
        res.json({err: 'Vous devez spécifier les champs obligatoires'});
      }
    },
    update: function(req, res) {
      if (typeof req.body.name !== 'undefined') {
        app.models.ProjectModel.findByIdAndUpdate(req.params.id, {
          description : req.body.description || '',
          url: req.body.url || {},
          stack: req.body.stack || {},
          isDone: req.body.done || false,
          host: req.body.host || '',
          name: req.body.name
        }, {}, function(err, result) {
          if (err) {
            res.json({err: 'Une erreur est survenue lors de la modification du projet'});
          }
          else {
            res.json({err: null, msg:'Projet mis à jour'});
          }
        });
      }
      else {
        res.json({err: 'Vous devez spécifier un nom de projet'});
      }
    },
    delete: function(req, res) {
      app.Models.ProjectModel.findByIdAndRemove(req.params.id, function(err, result){
        if (err) {
          aop.winston.error('An error occured while deleting a project %s', req.params.id);
          app.winston.error(err);
          res.json({err: 'Une erreur est survenue lors de la suppression'});
        }
        else {
          res.json({err: null, msg:'Suppression du projet réussie'});
        }
      });
    }
  }

}
