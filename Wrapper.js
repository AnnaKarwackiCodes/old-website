"use strict;"
//the point of this js file is to hold all the things that don't fit in the other files
var startLoc;
var endLoc;
var rad = 1;
var showDir = false;
var showGas = false;
var showWeather = false;
function setUI(){
  document.querySelector("#select").onchange = function(e){
    rad = e.target.value;
  };
  document.querySelector("#route").onclick = function(){
    startLoc = document.getElementById("startLoc").value;
    endLoc = document.getElementById("endLoc").value;
    if(startLoc != "" && endLoc != ""){
      $("#map").fadeIn(1000);
      $("#addInfo").fadeIn(1000);
        document.getElementById("controls").style.float = "right";
      document.getElementById("map").style.display = "block";
      document.getElementById("addInfo").style.display = "block";
      initMap();
      getCoords(startLoc);
      getCoords(endLoc);
    }
    else{
      alert("Both Start Location and End Location need to be filled to generate route.")
    }
  };
  
  document.querySelector("#showDir").onclick = function(){
    showDir = !showDir;
    if(showDir){
      document.querySelector("#dirHere").style.display = "block";
    }
    else{
      document.querySelector("#dirHere").style.display = "none";
    }
  };
  document.querySelector("#showGas").onclick = function(){
    showGas = !showGas;
    if(showGas){
      document.querySelector("#gasHere").style.display = "block";
    }
    else{
      document.querySelector("#gasHere").style.display = "none";
    }
  };
  document.querySelector("#showWeather").onclick = function(){
    showWeather = !showWeather;
    if(showWeather){
      document.querySelector("#weatherHere").style.display = "block";
    }
    else{
      document.querySelector("#weatherHere").style.display = "none";
    }
  };
}

window.onload = setUI;


















