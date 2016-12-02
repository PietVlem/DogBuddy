/**
 * Created by Pieter on 01/12/16.
 *
 */

(function(){

    var mapOptions = {
        center: new google.maps.LatLng(51.035556, 3.710556),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);


    var markerOptions = {
        position: new google.maps.LatLng(51.035556, 3.710556),
        map: map
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

})();



