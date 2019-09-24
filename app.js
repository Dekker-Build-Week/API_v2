const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
var express = require('express');
const jsonfile = require('jsonfile');

var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/projects', function (req, res) {
  jsonfile.readFile('all_projects.json', (err, data) => {
      if (err) throw  err;
      res.json(data);
  });
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
