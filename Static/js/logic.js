// perform an API call to the earthquake API to getinformation. Call createMarkers when complete


var myMap = L.map("map", {
  center: [40.73, -94.0059],
  zoom: 5,
});


L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1IjoicGF0dHlqdWxhIiwiYSI6IkVOR3JZSXcifQ.BcWJdvPPN1i3o64-mB5hjg"
}).addTo(myMap);



d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);

function createMarkers(response) {



  var features = response.features;
  var earthquakeMarkers = [];

  for (var index = 0; index < features.length; index++) {
    var feature = features[index];

    // for each station, create a marker
    var earthquakeMarker = L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
      fillOpacity: 0.5,
      color: chooseColor(feature.properties.mag),
      radius: feature.properties.mag*20000
      }).bindPopup("<h3 align='center'>Location: " + feature.properties.place + "</h3> <hr> <h3 align='center'>Magnitude: " + feature.properties.mag + "</h3>").addTo(myMap);

    // add the marker to the bikeMarkers array
    earthquakeMarkers.push(earthquakeMarker);
  };


    var legend = L.control({ position: "bottomright"});
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var colors = ['#f6e1a1', '#ecc591', '#e4a982', '#db8c72', '#d27064', '#ca5655', '#c13b47', '#b82238', '#b0002a'];
        var mags = ["<1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", ">8"]
        var labels = [];

        var legendInfo = "<h3>Magnitude</h3>";

        div.innerHTML = legendInfo;

        mags.forEach(function(mag, index) {
              labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
              div.innerHTML += "<ul>" + mag + labels[index] + "</ul>"
            });

        return div;
    };

    legend.addTo(myMap);

};


function chooseColor(magnitude) {

  if (magnitude <1) {
    return '#f6e1a1'
  } else if (magnitude <2) {
    return '#ecc591'
  } else if (magnitude <3) {
    return '#e4a982'
  } else if (magnitude <4) {
    return '#db8c72'
  } else if (magnitude <5) {
    return '#d27064'
  } else if (magnitude <6) {
    return '#ca5655'
  } else if (magnitude <7) {
    return '#c13b47'
  } else if (magnitude <8) {
    return '#b82238'
  } else {
    return '#b0002a'
  }

};
