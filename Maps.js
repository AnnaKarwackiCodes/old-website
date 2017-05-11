"use strict;"
var map;
var infoWindow;
var pos;
var onChangeHandler;
var icons = {
  gasStation: 'city-car.png',
  finish: 'checkered-flag.png',
  turn: 'direction-sign.png'
};
var gasInfoWindow;
function initMap() {
    clearGas();
    var markerArray = [];
    //clearGas();
    var directonsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.0834239, lng: -77.65780529999999},
        scrollwheel: true,
        zoom: 7
    });
    directionsDisplay.setMap(map);
    var turnDisplay = new google.maps.InfoWindow;
    calculateAndDisplayRoute(directonsService,directionsDisplay,markerArray,turnDisplay, map);
}
function calculateAndDisplayRoute(directionsService, directionsDisplay, markerArray,turnDisplay, map){
  document.getElementById("dirHere").innerHTML ="";
  document.getElementById("gasHere").innerHTML ="";
  document.getElementById("weatherHere").innerHTML = "";
  document.getElementById("weatherHere").innerHTML = "";
  for(var i = 0; i < markerArray.length;i++){
    markerArray[i].setMap(null);
  }
  
    directionsService.route({
      origin: document.getElementById('startLoc').value,
      destination: document.getElementById('endLoc').value,
      travelMode: 'DRIVING'
    }, function(response,status){
      if(status === 'OK'){
        directionsDisplay.setDirections(response);
        if(i == markerArray.length-1){islast = true;}
        showTurns(response,markerArray,turnDisplay,map);
      }
      else{
        window.alert('Directions request failed due to ' + status);
      }
    });
}

function showTurns(directions, ma, td, map){
  var myPath = directions.routes[0].legs[0];
  for(var i = 0; i < myPath.steps.length; i++){
    var mark = ma[i] = ma[i] || new google.maps.Marker;
    mark.setMap(map);
    mark.setPosition(myPath.steps[i].start_location);
    
    document.getElementById("dirHere").innerHTML +=  myPath.steps[i].instructions + "<br>";
    getGasStations("/stations/radius/"+mark.getPosition().lat()+"/"+mark.getPosition().lng()+"/"+rad+"/reg/distance/boksg36qo3.json?=callback=?");
  }
}

function attachHowTo(td,m,txt,map){
  google.maps.event.addListener(m,'click',function(){
    td.setContent(txt);
    td.open(map,m);
  });
}

function addGasMarkers(lat,lng, station, reg_price, pre_price,address){
  var position = {lat: Number(lat), lng: Number(lng)};
  var marker = new google.maps.Marker({
    position: position,
    map: map,
    icon: icons.gasStation
  });
  marker.setTitle(station);
  google.maps.event.addListener(marker,'click',function(e){
    showStationInfo(position, station,reg_price,pre_price,address);
  });
  gasStations.push(marker);
}

function clearGas(){
  if(gasInfoWindow) gasInfoWindow.close();
  
  for(var i = 0; i < gasStations.length; i++){
    gasStations[i].setMap(null);
  }
  
  gasStations = [];
}









