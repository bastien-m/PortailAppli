var mongoose = require('mongoose');

module.exports = function(app) {

	var ProjectsSchema = new mongoose.Schema({
		name 		: {type: String},
		stack 	: [{type: String}],
		url 		: [{name: {type: String}, link: {type: String}}],
		description : {type: String},
		isDone	: {type: Boolean},
		host		: {type: String}
	});

	ProjectModel = mongoose.model('Project', ProjectsSchema);

	ProjectModel.findByQuery = function(query, callback) {
		var regex = new RegExp(query, 'i');

		app.Models.ProjectModel.find({
			$or: [
				{name: regex},
				{url: {$elemMatch: {link: regex}}},
				{description: regex},
				{host: regex}
			]
		}, callback);

	}

	return ProjectModel;

}
