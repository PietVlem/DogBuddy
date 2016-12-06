/**
 * Created by Pieter on 01/12/16.
 *
 */

(function(){

    if(window.location.pathname == '/map.html' || window.location.pathname == '/map_desktop.html'){

    }


    var map;

    function initialize() {
        var map = new google.maps.Map(
            document.getElementById("map"), {
                center: new google.maps.LatLng(51.054342, 3.717424),
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
        map.data.addGeoJson(jsonData);
        map.data.setStyle({strokeColor: "#555555"})





        for(i = 0; i < local_storage_Hv.coordinates.length; i++){
            var markerOptions = {
                position: new google.maps.LatLng(local_storage_Hv.coordinates[i][1],local_storage_Hv.coordinates[i][0]),
                map: map,
                icon: 'images/map_pin_HV.png'
            };
            var marker = new google.maps.Marker(markerOptions);
            marker.setMap(map);
        }
    }
    google.maps.event.addDomListener(window, "load", initialize);







})();

/*

 var infoWindowOptions = {
 content: 'Gent-sint-Pieters'
 };

 var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
 google.maps.event.addListener(marker,'click',function(e){

 infoWindow.open(map, marker);

 });


 */


