let latitude;
let longitude;
let conversationLanguage;
    // Initialize and add the map
function initMap() {
    // The location of posMarker

    let posMarker = { lat: 0, lng: 0 };
    let marker = null;
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 2.5,
      center: posMarker,
    });
    
    
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
      let lt = mapsMouseEvent.latLng.lat();
      let abs_lt = Math.abs(lt);

      let degree = parseInt(abs_lt,10);
      let minutes = parseInt((abs_lt - degree)*60);
      let second = (((abs_lt - degree)*60) - minutes)*60;

      let lat_String;
      second = Math.round(second*100)/100;
      if (lt >= 0){
        lat_String = degree + "°N " + minutes + "' " + second + "''";
      } else {
        lat_String = degree + "°S " + minutes + "' " + second + "''";
      }

      let long = mapsMouseEvent.latLng.lng();

      let abs_long = Math.abs(long);

      let degreeLong = parseInt(abs_long,10);
    
      let minutesLong = parseInt((abs_long - degreeLong)*60);
      let secondLong = (((abs_long - degreeLong)*60) - minutesLong)*60;

      let long_String;
      secondLong = Math.round(secondLong*100)/100;
      if (long >= 0){
        long_String = degreeLong + "°E " + minutesLong + "' " + secondLong + "''";
      } else {
        long_String = degreeLong + "°W " + minutesLong + "' " + secondLong + "''";
      }

      latitude = lt;
      longitude = long;

      document.getElementById("in3").innerHTML = lat_String;
      document.getElementById("in4").innerHTML = long_String;
      LatLonToW3w();

      // create a new marker
      let pos = {lat: mapsMouseEvent.latLng.lat(), lng: mapsMouseEvent.latLng.lng()}
      if(marker != null){
        marker.setMap(null);
      }
      
      marker = new google.maps.Marker( {position: pos, map:map,});

    });
  }
  window.initMap = initMap;

  let LatLonToW3w = function(){
    let tag = document.getElementById("padd");
    document.getElementById("padd").innerHTML = "";    
    what3words.api.convertTo3wa({lat:latitude, lng:longitude}, conversationLanguage).then(function(response) {
    let words = response.words;
    tag.innerHTML = words;}).catch(function(error) {
    
    //errori
    console.log("[code]", error.code);
    console.log("[message]", error.message);
    alert("Hai fatto un errore di battitura, riprova");});
  }

  let language = document.getElementById("W3WLanguage");

language.addEventListener("change", function () {

  console.log(language.value);
  conversationLanguage = language.value;
  LatLonToW3w();

});