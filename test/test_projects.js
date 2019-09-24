var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var proj_models = require('../models/project.js');

describe('Project Model', function() {
  describe('#create_project', function() {
    it('should create a project', function() {
        var test1 = {title: 't1', description: 'd1', media: ['a']};
        proj_models.create_project(test1.title, test1.description, test1.media);
        var test2 = proj_models.get_project(test1);
        assert.equal(test1, test2, 'Input data should correctly be stored in the DB');
    });
    after(function() {
        var test1 = {title: 't1', description: 'd1', media: ['a']};
        proj_models.remove_project(test1);
    });
  });
});

