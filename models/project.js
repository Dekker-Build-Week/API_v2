const mongoose = require("mongoose");
// Define schema
var Schema = mongoose.Schema;

var projectSchema = new Schema({
   title: String,
   description: String,
   media: [String] 
});

var project = mongoose.model('Project', projectSchema);

function create_project(title, description, media, callback){
    
    var newProject = new project({ title: title, description: description, media: media });
    newProject.save(function (err, project) {
    if (err) return console.log('Creation failed');
    console.log('created project');
    });
    return { title: title, description: description, media: media }
}

function get_project(title, description, media, callback){
    var proj = {title: title, description: description, media: media}
    project.find(proj).then(function(result){
        console.log('success!');
        console.log(result);
        return result;
    }).catch(function(err){
        console.log(err)
    });
}

function remove_project({title, description, media}) {
    var proj = {title: title, description: description, media: media}
    //project.deleteOne({title: title, description: description, media: media}, function (err) {
    //    if (err) {
    //        console.log('Error removing project', err);
    //    }
    //    else {
    //        console.log('Removing project was successful')
    //    }
    //});
    project.deleteOne(proj).then(function(result){
        console.log('delete');
        return result;
    }).catch(function(err){
        console.log(err)
    });
}

module.exports = mongoose.model('Project', projectSchema);
module.exports.create_project = create_project;
module.exports.get_project = get_project;
module.exports.remove_project = remove_project;
