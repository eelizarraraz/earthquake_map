var Map = L.map("map", {
  center: [34.0522, -118.24],
  zoom: 8,
});


L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1IjoiZWxpemFycmFyYXoiLCJhIjoiY2pseDF0bnZyMDV0YzNycjV1a3RpaXk1NyJ9.SLez12r0cvo-bsxZevSjAw"
}).addTo(Map);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson", createMarkers);

function createMarkers(response) {

  var features = response.features;
  var earthquakeMarkers = [];

  for (var index = 0; index < features.length; index++) {
    var feature = features[index];

    
    var earthquakeMarker = L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
      fillOpacity: 0.25,
      color: chooseColor(feature.properties.mag),
      radius: feature.properties.mag*20000
      }).bindPopup("<h3 align='center'>Location: " + feature.properties.place + "</h3> <hr> <h3 align='center'>Magnitude: " + feature.properties.mag + "</h3>").addTo(Map);

    
    earthquakeMarkers.push(earthquakeMarker);
  };


    var legend = L.control({ position: "bottomright"});
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var colors = ['#00e600', '#b3ffb3', '#f6e1a1', '#db8c72', '#d27064', '#b0002a'];
        var mags = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"]
        var labels = [];

        var legendInfo = "<h3>Magnitude</h3>";

        div.innerHTML = legendInfo;

        mags.forEach(function(mag, index) {
              labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
              div.innerHTML += "<ul>" + mag + labels[index] + "</ul>"
            });

        return div;
    };

    legend.addTo(Map);

};


function chooseColor(magnitude) {

  if (magnitude <1) {
    return '#00e600'
  } else if (magnitude <2) {
    return '#b3ffb3'
  } else if (magnitude <3) {
    return '#f6e1a1'
  } else if (magnitude <4) {
    return '#db8c72'
  } else if (magnitude <5) {
    return '#d27064'
  } else {
    return '#b0002a'
  }

};
