var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var andi_models = require('../models/andi.js');
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

describe('Andi Model', function() {
  describe('#create_andi', function() {
    it('//should create an andi', async function() {
        var andi_details = {name: 'jim', photo: 'cool/photo.jpg'};
        var new_andi = await andi_models.create_andi(andi_details.name, andi_details.photo);
        var saved_andi = await andi_models.get_andi(andi_details.name, andi_details.photo);
        assert.equal(new_andi.name, saved_andi.name, 'name mismatch');
        assert.equal(new_andi.photo, saved_andi.photo, 'photo mismath');
    });
    after(async function() {
        var t1 = {name: 'jim', photo: 'cool/photo.jpg'};
        await andi_models.remove_andi(t1);
        db.close();
    });
  });
});
