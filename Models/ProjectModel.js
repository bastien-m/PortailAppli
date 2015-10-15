var mongoose = require('mongoose');

module.exports = function(app) {

	/*
	- Nom
	- Technos (liste)
	- url liste d'objet {name, link}
	- description
	- en dev (on/off)
	- serveurs
	*/

	//Schema definition
	var ProjectsSchema = new mongoose.Schema({
		name 		: {type: String},
		stack 	: [{type: String}],
		// url 		: [{type: mongoose.Schema.Types.Mixed}],
		url 		: [{name: {type: String}, link: {type: String}}],
		description : {type: String},
		isDone	: {type: Boolean},
		host		: {type: String}
	});

	ProjectModel = mongoose.model('Project', ProjectsSchema);

	return ProjectModel;

}
