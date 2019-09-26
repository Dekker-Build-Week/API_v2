const mongoose = require("mongoose");
// Define schema
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  name: String,
  imagePath: String
});

var client = mongoose.model("Client", clientSchema);

async function create_client(_name, _imagePath) {
  var newClient = new client({ name: _name, imagePath: _imagePath });
  await newClient.save(function(err) {
    if (err) {
      return console.log("Error creating client " + _name);
    } else {
      return newClient;
    }
  });
}

async function get_client(_name, _imagePath) {
  var newClient = new client({ name: _name, imagePath: _imagePath });
  var foundClient = await client.findOne(newClient, (err, client) => {
    if (err) {
      console.log("Error retrieving " + _name, err);
    } else {
      return client;
    }
  });
  return foundClient;
}

async function remove_client(_name, _imagePath) {
  var newClient = new client({ name: _name, imagePath: _imagePath });
  await client.deleteOne(newClient, function(err) {
    if (err) {
      console.log("Error removing " + _name);
    } else {
      console.log(_name + " successfully removed");
    }
  });
}

module.exports = mongoose.model("Client", clientSchema);
module.exports.create_client = create_client;
module.exports.get_client = get_client;
module.exports.remove_client = remove_client;
