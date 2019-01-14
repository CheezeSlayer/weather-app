var apiKey = '19A032Hm0hCsHK4F6phJdyWGMa4ftXx1';
var darkSkyKey = '24431d0e56632af62a7e1891d23a0fd9';

var mquestobj;
var cntryobj;
var wthrobj;
var country;
var state;
var city;
var isoCode;
var lat;
var lng;

function getWeather() {
  var input = document.getElementById("address")
  const Http = new XMLHttpRequest();
  const url1 = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${input.value}`;

  Http.open("GET", url1);
  Http.send();
  Http.onreadystatechange = function() {
    if(this.readyState==4 && this.status==200) {
      mquestobj = JSON.parse(Http.responseText);

      country = mquestobj.results[0].locations[0].adminArea1;
      state = mquestobj.results[0].locations[0].adminArea3;
      city = mquestobj.results[0].locations[0].adminArea5;
      console.log(mquestobj.results[0].locations[0].latLng);
      lat = mquestobj.results[0].locations[0].latLng.lat;
      lng = mquestobj.results[0].locations[0].latLng.lng;
      console.log(lat);
      console.log(lng);
    }
  }

  setTimeout( function() {
    const url2 = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng}`;
    Http.open("GET", url2);
    Http.send();
    Http.onreadystatechange = function() {
      if(this.readyState==4 && this.status==200 ) {
        wthrobj = JSON.parse(Http.responseText);
        console.log(wthrobj.currently.summary);
        document.getElementById("summary").innerHTML = wthrobj.currently.summary;
      }
    }
  }, 1000)


  setTimeout( function() {
    isoCode = country
    console.log(country);
    const url3 = `https://restcountries.eu/rest/v2/alpha/${isoCode}`;
    Http.open("GET", url3);
    Http.send();
    Http.onreadystatechange = function() {
      if(this.readyState==4 && this.status==200) {
        cntryobj = JSON.parse(Http.responseText);
        isoCode = cntryobj.name;
        console.log(isoCode);
        document.getElementById("country").innerHTML = isoCode;
        document.getElementById("state").innerHTML = state;
        document.getElementById("city").innerHTML = city;
      }
    }
  }, 500)
}
