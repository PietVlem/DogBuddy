/**
 * Created by Pieter on 01/12/16.
 *
 */

(function(){

    mapboxgl.accessToken = 'pk.eyJ1IjoicGlldHZsZW0iLCJhIjoiNjE5MjlmMDAwYzI1YTUzNDQzMWU5M2I5ZTJhZmFlYmIifQ.15Xi84zS8LM84h1HvPMEsQ';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
        center: [3.710556, 51.035556], // starting position
        zoom: 16 // starting zoom
    });
/*
    var mapOptions = {
        center: new google.maps.LatLng(51.035556, 3.710556),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);


    var markerOptions = {
        position: new google.maps.LatLng(51.035556, 3.710556),
        map: map,
        disableDefaultUI: false,
        zoomControl:false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
    };
    var marker = new google.maps.Marker(markerOptions);
    marker.setMap(map);

    var infoWindowOptions = {
        content: 'Gent-sint-Pieters'
    };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    google.maps.event.addListener(marker,'click',function(e){

        infoWindow.open(map, marker);

    });

    // map.data.loadGeoJson('https://datatank.stad.gent/4/infrastructuur/hondenvoorzieningen.geojson')
*/
})();



