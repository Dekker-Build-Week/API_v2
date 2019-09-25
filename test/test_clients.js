var assert = require("chai").assert;
var client_model = require("../models/client.js");
var Mongoose = require("mongoose");

//Set up default mongoose connection
var mongoDB =
  "mongodb://test_account:TestPassword123@ds227459.mlab.com:27459/build-week-db";
Mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = Mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

describe("Client Model", function() {
  describe("#create_client", function() {
    it("//should create a client", async function() {
      var client_1 = { name: "c1", imagePath: "1/2/3/" };
      console.log('LINE 20 - client_1', client_1.name, client_1.imagePath)
      var new_client = await client_model.create_client(
        client_1.name,
        client_1.imagePath
      );
      var saved_client = await client_model.get_client(
        client_1.name,
        client_1.imagePath
      );
      console.log('LINE 29 - new client name: ' + new_client.name);
      console.log('LINE 30 - saved client name: ' + saved_client.name);
      assert.equal(new_client.name, saved_client.name, "name mismatch");
      assert.equal(
        new_client.imagePath,
        saved_client.imagePath,
        "image path mismatch"
      );
    });
    after(async function() {
      var client_1 = { name: "c1", imagePath: "1/2/3/" };
      await client_model.remove_client(client_1);
      db.close();
    });
  });
});
