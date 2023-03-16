var express = require('express');
var moment = require('moment');

var app = express();
var port = 3000;

//  EJS  template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

var checkTime = function(req, res, next) {
  var now = moment();
  var dayOfWeek = now.day();
  var hourOfDay = now.hour();
  if (dayOfWeek > 0  && dayOfWeek < 6 && hourOfDay >= 9 && hourOfDay < 17
    ) {
    next(); 
  } else {
    res.status(404).send('Sorry, this web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

app.use(express.static('public'));

// routes
app.get('/', checkTime, function(req, res) {
  res.render('home');
});

app.get('/services', checkTime, function(req, res) {
  res.render('services');
});

app.get('/contact', checkTime, function(req, res) {
  res.render('contact');
});

// start the server
app.listen(port, function() {
  console.log('Server listening at http://localhost:' + port);
});
