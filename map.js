// Map initialization 
 var map = L.map('map').setView([14.0860746, 100.608406], 6);

 //osm layer

/* var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 });
 osm.addTo(map); */

 var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 

 /*
 var osm = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
 maxZoom: 20,
 attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
})
*/

 if(!navigator.geolocation) {
     console.log("Your browser doesn't support geolocation feature!")
 } else {
     setInterval(() => {
         navigator.geolocation.getCurrentPosition(getPosition)
     }, 5000);
 }

 var marker, circle;

 function getPosition(position){
     // console.log(position)
     var lat = position.coords.latitude
     var long = position.coords.longitude
     var accuracy = position.coords.accuracy

     if(marker) {
         map.removeLayer(marker)
     }

     if(circle) {
         map.removeLayer(circle)
     }

     marker = L.marker([lat, long])
     circle = L.circle([lat, long], {radius: accuracy})

     var featureGroup = L.featureGroup([marker, circle]).addTo(map)

     map.fitBounds(featureGroup.getBounds())

     var userOutputDisplay = "Your coordinate is: Lat: "+ lat +"; Long: "+ long+ "; Accuracy: "+ accuracy
     document.getElementById('startInfoInner').innerHTML = userOutputDisplay;
     }