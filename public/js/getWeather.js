var apiKey = '19A032Hm0hCsHK4F6phJdyWGMa4ftXx1';
var darkSkyKey = '24431d0e56632af62a7e1891d23a0fd9';

var proxy1 = "http://cors.io/?";
var proxy2 = "https://jsonp.afeld.me/?url=";
var proxy3 = "https://cors-anywhere.herokuapp.com/";

var mquestobj;
var cntryobj;
var wthrobj;

var country;
var state;
var city;
var isoCode;
var locString;
var lat;
var lng;

var temp;
var appTemp;
var icon;
var idOld;
var canvasID;

var coordinates;
var nation;
var weather;


  coordinates = function () {
    return new Promise(function(resolve, reject) {
      var input = document.getElementById("address");
      const xhr = new XMLHttpRequest();
      const url1 = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${input.value}`;

      xhr.onreadystatechange = function() {
        //console.log("coordinates step1 this:", this, this.readyState, this.status);
        if(this.readyState==4 && this.status==200) {
          mquestobj = JSON.parse(xhr.responseText);
          country = mquestobj.results[0].locations[0].adminArea1;
          state = mquestobj.results[0].locations[0].adminArea3;
          city = mquestobj.results[0].locations[0].adminArea5;
          //console.log(mquestobj.results[0].locations[0].latLng);
          //console.log(country);
          lat = mquestobj.results[0].locations[0].latLng.lat;
          lng = mquestobj.results[0].locations[0].latLng.lng;
          resolve("Got Coordinates");
        }else if (this.status==400){
          reject(Error("Get Coordinates Failed"));
        }
      };
      xhr.open("GET", url1);
      xhr.send();
    })
  }

  nation = function() {
    return new Promise(function(resolve, reject) {
      isoCode = country;
      //console.log(country);
      const xhr = new XMLHttpRequest();
      const url3 = `https://restcountries.eu/rest/v2/alpha/${country}`;
      xhr.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200) {
          cntryobj = JSON.parse(xhr.responseText);
          //console.log(isoCode);
          locString = `${city}, ${state}, ${cntryobj.name}`;
          document.getElementById("location-header").innerHTML = locString;
          resolve("Got country");
        }else if(this.status==400){
          reject("Get country failed");
        }
      };
      xhr.open("GET", url3);
      xhr.send();
    })
}

  weather = function() {
    return new Promise(function(resolve, reject){
      const xhr = new XMLHttpRequest();
      const url2 = `${proxy2}https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng}`;
      xhr.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200 ) {
          wthrobj = JSON.parse(xhr.responseText);
          //console.log(wthrobj.currently.summary);
          var fahTemp;
          document.getElementById("summary").innerHTML = wthrobj.currently.summary;
          fahTemp = wthrobj.currently.temperature;
          document.getElementById("temp").innerHTML = Math.round(((fahTemp-32) * 5/9));
          document.getElementById("temp").innerHTML += "&#8451";
          fahTemp = wthrobj.currently.apparentTemperature;
          document.getElementById('apptemp').innerHTML = Math.round(((fahTemp-32) * 5/9));
          document.getElementById("apptemp").innerHTML += "&#8451";
          icon = wthrobj.currently.icon;
          canvasID = document.getElementById("icon");
          //console.log(icon);
          var oldClass = canvasID.getAttribute("class");
          //console.log(canvasID.getAttribute("class"));
          document.getElementById("icon").classList.remove(oldClass);
          document.getElementById("icon").classList.add(icon);
          resolve("Got weather");
        }else if(this.status==400){
          reject("Get weather failed");
        }
      };
      xhr.open("GET", url2);
      xhr.send();
    })
}


function getWeather(){

  coordinates()
  .then(function(value){
    console.log("step 1:", value);
    return nation()
  })
  .then(function(value){
    console.log("step 2:", value);
    return weather()
  })
  .then(function(value){
    console.log("step 3:", value);
  })
  .then(function(){
    return true;
  })
  .catch(function(error){
    console.log(error);
    return false;
  })
}

/*
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
      //console.log(mquestobj.results[0].locations[0].latLng);
      lat = mquestobj.results[0].locations[0].latLng.lat;
      lng = mquestobj.results[0].locations[0].latLng.lng;
      //console.log(lat);
      //console.log(lng);
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
        var fahTemp;
        document.getElementById("summary").innerHTML = wthrobj.currently.summary;
        fahTemp = wthrobj.currently.temperature;
        document.getElementById("temp").innerHTML = Math.round(((fahTemp-32) * 5/9));
        document.getElementById("temp").innerHTML += "&#8451";
        fahTemp = wthrobj.currently.apparentTemperature;
        document.getElementById('apptemp').innerHTML = Math.round(((fahTemp-32) * 5/9));
        document.getElementById("apptemp").innerHTML += "&#8451";
        icon = wthrobj.currently.icon;
        canvasID = document.getElementById("icon");
        var oldClass = canvasID.getAttribute("class");
    document.getElementById("icon").classList.remove(oldClass);
        document.getElementById("icon").classList.add(icon);
      }
    }
  }, 1000)

  setTimeout( function() {
    isoCode = country
    //console.log(country);
    const url3 = `https://restcountries.eu/rest/v2/alpha/${isoCode}`;
    Http.open("GET", url3);
    Http.send();
    Http.onreadystatechange = function() {
      if(this.readyState==4 && this.status==200) {
        cntryobj = JSON.parse(Http.responseText);
        //console.log(isoCode);
        locString = `${city}, ${state}, ${cntryobj.name}`;
        document.getElementById("location-header").innerHTML = locString;
      }
    }
  }, 500)
}
*/
