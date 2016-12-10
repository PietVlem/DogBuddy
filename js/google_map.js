/**
 * Created by Pieter on 01/12/16.
 *
 */

(function () {
    if (window.location.pathname == '/MAP_Desktop/' || window.location.pathname == '/map/') {

        var key = 'AIzaSyBor4Ubia9VE6npjvflRJCpNdOfdMuMINI';

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp'
            + '&key=' + key
            + '&callback=initGoogleMaps';
        document.body.insertBefore(script, document.querySelector('#google_script'));

        this.initGoogleMaps = function () {
            GMap.initMap();

            GMap.addMarkerHV();
            GMap.addMarkerDoctors();
            GMap.addLinesWalkingRoutes();
            GMap.addParcAreas();




            /*
            utils.getGEOLocationByPromise();
            console.log(navigator.geolocation);
            */

        }





    }


})();

var GMap = {
    initMap: function () {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 51.054342, lng: 3.717424},
            zoom: 14
        });
    },
    addMarkerHV: function (JSONdata, markerImg) {
        utils.readJsonFile('/data/hondenvoorzieningen.json' , function (text) {
            var data = JSON.parse(text);
            for (var i = 0; i < data.coordinates.length; i++) {
                var marker = new google.maps.Marker(
                    {
                        position: {lat: data.coordinates[i][1], lng: data.coordinates[i][0]},
                        icon: '/images/map_pin_HV.png'
                    }
                );
                marker.setMap(map);
            }
        });
    },
    addMarkerDoctors: function () {
        utils.readJsonFile('/data/dieren_artsen.json' , function (text) {
            var data = JSON.parse(text);
            for (var i = 0; i < data.length; i++) {
                var marker = new google.maps.Marker(
                    {
                        position: {lat: data[i].coordinates[0], lng: data[i].coordinates[1]},
                        icon: '/images/arts.png'
                    }
                );
                marker.setMap(map);
            }
        });
    },
    addLinesWalkingRoutes: function(){
        utils.readJsonFile('/data/wandelroutes.json' , function (text) {
            var data = JSON.parse(text);
            map.data.addGeoJson(data);
        });

    },
    addParcAreas: function(){
        utils.readJsonFile('/data/parken.json' , function (text) {
            var data = JSON.parse(text);
            map.data.addGeoJson(data);
        });
    }
};

