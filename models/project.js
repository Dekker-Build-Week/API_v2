const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    title: String,
    description: String,
    client: { name: String, imagePath: String },
    team: [{ name: String, photoPath: String }],
    techStacks: [{ name: String, imagePath: String}],
    coverImagePath: String ,
    videoPath: String 
});

var project = mongoose.model("Project", projectSchema);

async function create_project(ttl, desc, c, tm, tcStks, imgs, vids) {
    var newProject = new project({
        title: ttl,
        description: desc,
        client: c,
        team: tm,
        techStacks: tcStks,
        coverImagePath: imgs,
        videoPath: vids
    });
    await newProject.save(function(err, project) {
        if (err) return console.error(err);
    });
    console.log(newProject.title, " successfully created.");
    return newProject;
}

async function get_project(projectId) {
    var foundProject = await project.findById(projectId, (err, result) => {
        if (err) console.error(err);
        return result;
    });
    return foundProject;
}

async function get_all_projects() {
    var allProjects = await project.find((err, result) => {
        if (err) console.error(err);
        return result;
    });
    console.log("Projects", allProjects);
    return allProjects;
}

async function remove_project(projectId) {
    var deleted_proj = await project.findByIdAndDelete(projectId, function(
        err,
        result
    ) {
        if (err) console.log(err);
        return result;
    });
    console.log(deleted_proj.title, " has been successfully deleted.");
}

module.exports = mongoose.model("Project", projectSchema);
module.exports.create_project = create_project;
module.exports.get_project = get_project;
module.exports.remove_project = remove_project;
module.exports.get_all_projects = get_all_projects;