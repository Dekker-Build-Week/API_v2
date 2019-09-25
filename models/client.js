const mongoose = require("mongoose");
// Define schema
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  name: String,
  imagePath: String
});

var client = mongoose.model("Client", clientSchema);

function create_client(_name, _imagePath) {
  var newClient = new client({ name: _name, imagePath: _imagePath });
  newClient.save(function(err, client) {
    if (err) {
      return console.log("Error creating client " + _name);
    } else {
      return client;
    }
  });
}

function get_client(_name) {
  client.find({ name: _name }, function(err, client) {
    if (err) {
      console.log("Error retrieving " + _name, err);
    } else {
      return client;
    }
  });
}

function remove_client(_name, _imagePath){
    client.deleteOne({name: _name, imagePath: _imagePath}, function(err){
        if (err){
            console.log('Error removing ' + _name);
        }
        else{
            console.log(_name + ' successfully removed');
        }
    })
}

module.exports = mongoose.model("Client", clientSchema);
module.exports.create_client = create_client;
module.exports.get_client = get_client;
module.exports.remove_client = remove_client;
