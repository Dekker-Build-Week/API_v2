const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  title: String,
  description: String,
  clients: { name: String, imagePath: String },
  team: [{ name: String, photoPath: String }],
  techStacks: [{ name: String, imagePath: String, important: Boolean }],
  images: [{ imagePath: String, position: Number }],
  video: { videoPath: String }
});

var project = mongoose.model("Project", projectSchema);

async function create_project(title, description, media) {
  var newProject = new project({
    title: title,
    description: description,
    media: media
  });
  await newProject.save(function(err, project) {
    if (err) return console.error("err");
  });
  return newProject;
}

async function get_project(title, description, media) {
  var proj = { title: title, description: description, media: media };
  const foundProject = await project.findOne(proj, (err, result) => {
    if (err) console.error(err);
    return result;
  });
  return foundProject;
}

async function remove_project({ title, description, media }) {
  var proj = { title: title, description: description, media: media };
  var foo = await project.deleteOne(proj, function(err) {
    if (err) console.log(err);
  });
  //console.log('foo is ', foo);
}

module.exports = mongoose.model("Project", projectSchema);
module.exports.create_project = create_project;
module.exports.get_project = get_project;
module.exports.remove_project = remove_project;
