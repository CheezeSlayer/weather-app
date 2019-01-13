var express = require('express');
var request = require('request');

var app = express();

var apiKey = "19A032Hm0hCsHK4F6phJdyWGMa4ftXx1";

request({
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=1301%20lombard%20street%20philadelphia`,
  json: true
}, (error, response, body) => {
  //console.log(body.results[0].locations);
});


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendfile('pages/home.html', {
  });
})

app.get('/pages/home.html', (req, res) => {
  res.sendfile('pages/home.html', {
  });
});

app.listen( 3000 , function() {
  console.log("Express server running on port 3000");
})
