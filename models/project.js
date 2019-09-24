const mongoose = require("mongoose");
// Define schema
var Schema = mongoose.Schema;

var projectSchema = new Schema({
   title: String,
   description: String,
   media: [String] 
});

function create_project(title, description, media){
    console.log('this is a stub');
}


module.exports = mongoose.model('Project', projectSchema);
module.exports.create_project = create_project;
