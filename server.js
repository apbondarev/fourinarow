var express = require('express');
var app = express();

var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
 
app.get('/', function (req, res) {
  res.render('public/index.html');
});
 
app.listen(3000);