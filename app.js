var express = require('express');
var request = require('request');
var app = express();

//1301%20lombard%20street%20philadelphia
var apiKey = "19A032Hm0hCsHK4F6phJdyWGMa4ftXx1";

request({
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=6555 Wade Road`,
  json: true
}, (error, response, body) => {
  if(error) {
    console.log(error);
  }
  console.log(response.statusCode);
  console.log(body.results[0].locations[0].latLng);
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

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
