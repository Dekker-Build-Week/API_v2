const mongoose = require("mongoose");
// Define schema
var Schema = mongoose.Schema;

var projectSchema = new Schema({
   title: String,
   description: String,
   media: [String] 
});

var project = mongoose.model('Project', projectSchema);

function create_project(title, description, media){
    console.log('this is a stub');
    
    var newProject = new project({ title: title, description: description, media: media });
    newProject.save(function (err, project) {
    if (err) return console.log('Creation failed');
    return project;
    });
}

function get_project(title, description, media){
    project.find({title: title, description: description, media: media}, function (err, project) {
        if (err) {
            console.log('Error retrieving project: ', err);
        }
        else {
            return project;
        }
    });
}

function remove_project({title, description, media}) {
    project.deleteOne({title: title, description: description, media: media}, function (err) {
        if (err) {
            console.log('Error removing project', err);
        }
        else {
            console.log('Removing project was successful')
        }
    });
}

module.exports = mongoose.model('Project', projectSchema);
module.exports.create_project = create_project;
module.exports.get_project = get_project;
module.exports.remove_project = remove_project;
