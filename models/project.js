const mongoose = require("mongoose");
// Define schema
var Schema = mongoose.Schema;

var projectSchema = new Schema({
   title: String,
   description: String,
   media: [String] 
});

module.exports = mongoose.model('Project', projectSchema);