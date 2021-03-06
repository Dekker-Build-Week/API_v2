const mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Mongoose schema for a project
var projectSchema = new Schema({
    title: String,
    description: String,
    client: { name: String, imagePath: String },
    team: [{ name: String, photoPath: String }],
    techStacks: [{ name: String, imagePath: String}],
    coverImagePath: String ,
    videoPath: String,
    images: [{name:String, position:Number}]
});

var project = mongoose.model("Project", projectSchema);

async function create_project(ttl, desc, c, tm, tcStks, coverImage, vids, imgs) {
    var newProject = new project({
        title: ttl,
        description: desc,
        client: c,
        team: tm,
        techStacks: tcStks,
        coverImagePath: coverImage,
        videoPath: vids,
        images: imgs
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

async function get_all_projects(page = 1, limit= 8, orderBy='title') {
    console.log(limit);
    
    var allProjects = await project.find({}, null, { skip: limit*(page-1), limit, sort:orderBy }, (err, result) => {
        if (err) console.error(err);
        return result;
    })


    console.log("Projects", allProjects);
    return allProjects;
}

//Export the project schema and methods
module.exports = mongoose.model("Project", projectSchema);
module.exports.create_project = create_project;
module.exports.get_project = get_project;
module.exports.get_all_projects = get_all_projects;