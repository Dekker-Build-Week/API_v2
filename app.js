const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
var express = require('express');
const jsonfile = require('jsonfile');
var proj_models = require('./models/project');

//Set up default mongoose connection
var mongoDB = 'mongodb://test_account:TestPassword123@ds227459.mlab.com:27459/build-week-db';
Mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = Mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();
app.use(BodyParser.json());
app.use(express.static('media'));

app.get('/', function (req, res) {
  res.send('Hello World!');
  proj_models.create_project('aa', 'bb', 'cc');
});

app.get('/projects', function (req, res) {
  jsonfile.readFile('all_projects.json', (err, data) => {
      if (err) throw  err;
      res.json(data);
  });
});

// Create a project

var jsonParser = BodyParser.json()
app.post('/create_project',jsonParser, function(req, res){
    var item = req.body;
    proj_models.create_project(item.title, item.description, item.media);
    res.send('added project')
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`API listening on port ${ PORT }!`);
});
