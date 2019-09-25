var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var proj_models = require('../models/project.js');
var Mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://test_account:TestPassword123@ds227459.mlab.com:27459/build-week-db';
Mongoose.connect(mongoDB, { useNewUrlParser: true }, function(err){
    console.error(err);
});

//Get the default connection
var db = Mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

describe('Project Model', function() {
  describe('#create_project', function() {
    it('//should create a project', async function() {
        var proj_details = {title: "t1", description: "d1", media: ["a"]};
        var new_proj = await proj_models.create_project(proj_details.title, proj_details.description, proj_details.media);
        var saved_proj = await proj_models.get_project(proj_details.title, proj_details.description, proj_details.media);
        assert.equal(new_proj.title, saved_proj.title, 'title mismath');
        assert.equal(new_proj.description, saved_proj.description, 'description mismath');
        assert.equal(new_proj.media[0], saved_proj.media[0], 'media mismath');
    });
    after(async function() {
        var test1 = {title: 't1', description: 'd1', media: ['a']};
        await proj_models.remove_project(test1);
        db.close();
    });
  });
});
