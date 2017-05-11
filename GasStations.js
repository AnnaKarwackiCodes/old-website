"use strict;"
var gasAPI = "http://api.mygasfeed.com/";
var gasStations = [];
var gasHTML = "";

function getGasStations(urlExtend){
  gasHTML = "";
  var url = gasAPI + urlExtend;
  $.ajax({
    dataTpye:"jsonp",
    url: url,
    data: null,
    success: stationsLoaded
  });
}

function stationsLoaded(obj){
  if(obj.error){
    var stat = obj.status;
    var desc = obj.description;
    console.error(stat + " " + desc);
    return;
  }
  if(obj.total_items == 0){
    console.log("it empty");
    return;
  }
  for(var i = 0; i < obj.stations.length;i++){
    var station = obj.stations[i];
    gasHTML += "<div id='station'>";
    gasHTML += "<p>" + station.station +"</p>";
    gasHTML += "<p> Regular Price: $" + station.reg_price +"</p>";
    gasHTML += "<p> Premium Price: $" + station.pre_price +"</p>";
    gasHTML += "<p> Address: " + station.address +"</p>";
    gasHTML +="</div>";
    //send the location of this station to be put on the map
    addGasMarkers(station.lat,station.lng, station.station, station.reg_price, station.pre_price,station.address);
  }
  document.querySelector("#gasHere").innerHTML = gasHTML;
}

function showStationInfo(position, station,reg_price,pre_price,address){
  if(gasInfoWindow) gasInfoWindow.close();
  var content = "<b>" + station + "<br>Regular: $"+reg_price+"<br>Premium: $"+pre_price+"<br>"+address +"</b>";
  gasInfoWindow = new google.maps.InfoWindow({
    map:map,
    position: position,
    title: station,
    content: content
  });
}
