"use strict;"

var weatherKey = "c0759bd468e3080f708f430bf8dfb326";
var weatherBase = "https://api.openweathermap.org/data/2.5/forecast?lat=";
var mapAPI = "AIzaSyCei-FsaPj25vg04Ylx5ebyylqnUwMh2iA";
var geoCodeBase = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var weatherHTML = "";
var curCity;

function getCoords(cityAddress){
  curCity = cityAddress;
  weatherHTML = "";
  var newAdd = cityAddress.replace(/ /gi,"+");
  var url = geoCodeBase + newAdd + "&key=" + mapAPI;
  $.ajax({
    dataTpye:"jsonp",
    url: url,
    data: null,
    success: function(obj){
      var lat = obj.results[0].geometry.location.lat;
      var lng = obj.results[0].geometry.location.lng;
      
      var url = weatherBase + lat + "&lon=" + lng +"&APPID=" + weatherKey;
      $.ajax({
        dataTpye:"jsonp",
        url:url,
        data:null,
        success:function(obj){
          weatherHTML += "<h3>5 Day Forecast for: " + cityAddress + "</h3>";
          //weatherHTML
          for(var i = 0; i < obj.list.length; i+=8){
            weatherHTML +="<div id=day>";
            var temp = Math.round(Number(obj.list[i].main.temp) *(9/5) - 459.67);
            weatherHTML += "<p><b>" + obj.list[i].dt_txt + "</b></p>";
            weatherHTML += "<p>" + temp + " degrees fahrenheit</p>";
            weatherHTML += "<p>Description: " + obj.list[i].weather[0].description + "</p>";
            weatherHTML += "</div>";
            document.querySelector("#weatherHere").innerHTML = weatherHTML;
        }
          }
      });
    }
  });
}








