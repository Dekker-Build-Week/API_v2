var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var proj_models = require('../models/project.js');
var Mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://test_account:TestPassword123@ds227459.mlab.com:27459/build-week-db';
Mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = Mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

describe('Project Model', function() {
  describe('#create_project', function() {
    it('should create a project', function() {
        var project_details = {title: "t1", description: "d1", media: ["a"]};
        var new_project = proj_models.create_project(project_details.title, project_details.description, project_details.media);
        var saved_project = proj_models.get_project(project_details.title, project_details.description, project_details.media);
        assert.equal(new_project, saved_project, 'Input data should correctly be stored in the DB');
    });
    after(function() {
        var test1 = {title: 't1', description: 'd1', media: ['a']};
        proj_models.remove_project(test1);
        console.log('unreachable');
        //db.close();
    });
        console.log('unreachable2');
  });
});
