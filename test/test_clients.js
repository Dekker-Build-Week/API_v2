var assert = require('chai').assert;
var client_model = require('../models/client.js');
var Mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://test_account:TestPassword123@ds227459.mlab.com:27459/build-week-db';
Mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = Mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

describe('Client Model testing', function(){
    describe('#create_client', function(){
        var client_1 = {name: 'c1', imagePath: '1/2/3/'};
        var new_client = client_model.create_client(client_1.name, client_1.imagePath);
        var saved_client = client_model.get_client(client_1.name);
        assert.equal(new_client, saved_client, 'Input data should correctly be stored in the DB')
    });
    after(function(){
        var client_1 = {name: 'c1', imagePath: '1/2/3/'};
        client_model.remove_client(client_1);
        //db.close();
    });
});