/**
 * Created by Pieter on 01/12/16.
 *
 */


(function () {

    /*
     utils.getGEOLocationByPromise();
     console.log(navigator.geolocation);
     */

    if (window.location.pathname == '/MAP_Desktop/' || window.location.pathname == '/map/') {

        //laden hv
        var dataHV = {};
        utils.readJsonFile('/data/hondenvoorzieningen.json', function (text) {
            dataHV = JSON.parse(text);
        });

        //laden Artsen
        var DataDA = {};
        utils.readJsonFile('/data/dieren_artsen.json', function (text) {
            DataDA = JSON.parse(text);
        });

        //2 data layers definieren
        var WRlayer, PAlayer;


        var key = 'AIzaSyBor4Ubia9VE6npjvflRJCpNdOfdMuMINI';
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp'
            + '&key=' + key
            + '&callback=initGoogleMaps';
        document.body.insertBefore(script, document.querySelector('#google_script'));


        this.initGoogleMaps = function () {
            GMap.initMap();

            GMap.addMarkerHV(dataHV);
            GMap.addMarkerDoctors(DataDA);

            WRlayer = new google.maps.Data();
            PAlayer = new google.maps.Data();
            GMap.addLinesWalkingRoutes(WRlayer);
            GMap.addParcAreas(PAlayer);
        };

        var formSearch = document.querySelector("#form_search_desktop");
        var test_btn = document.querySelector("#test_btn");
        test_btn.onclick = function () {
            GMap.hideMarkerHV();
            GMap.hideMarkerDA();
            WRlayer.setMap(null);
            PAlayer.setMap(null);

            if(document.querySelector("#parken").checked == true){
                GMap.addParcAreas(PAlayer);
            }
            if(document.querySelector("#wandelroutes").checked == true){
                GMap.addLinesWalkingRoutes(WRlayer);
            }
            if(document.querySelector("#hVz").checked == true){
                GMap.addMarkerHV(dataHV);
            }
            if(document.querySelector("#artsen").checked == true){
                GMap.addMarkerDoctors(DataDA);
            }
        };
    }

})();

var GMap = {
    initMap: function () {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 51.054342, lng: 3.717424},
            zoom: 14
        });
        this.HVarray = [];
        this.DAarray = [];
    },
    addMarkerHV: function (dataHV) {
        for (var i = 0; i < dataHV.coordinates.length; i++) {
            var marker = new google.maps.Marker(
                {
                    position: {lat: dataHV.coordinates[i][1], lng: dataHV.coordinates[i][0]},
                    icon: '/images/map_pin_HV.png'
                }
            );
            marker.setMap(map);
            this.HVarray.push(marker);
        }
    },
    hideMarkerHV: function () {
        for (var i = 0; i < this.HVarray.length; i++) {
            var marker = this.HVarray[i];
            marker.setVisible(false);
        }
        this.HVarray = [];
    },
    addMarkerDoctors: function (DataDA) {
        for (var i = 0; i < DataDA.length; i++) {
            var marker = new google.maps.Marker(
                {
                    position: {lat: DataDA[i].coordinates[0], lng: DataDA[i].coordinates[1]},
                    icon: '/images/arts.png'
                }
            );
            marker.setMap(map);
            this.DAarray.push(marker);
        }
    },
    hideMarkerDA: function () {
        for (var i = 0; i < this.DAarray.length; i++) {
            var marker = this.DAarray[i];
            marker.setVisible(false);
        }
        this.DAarray = [];
    },
    addLinesWalkingRoutes: function (layer) {
        var WRlayer = layer;
        utils.readJsonFile('/data/wandelroutes.json', function (text) {
            var data = JSON.parse(text);
            WRlayer.addGeoJson(data);
            WRlayer.setStyle({
                strokeColor: '#bf6a35',
                strokeWeight: 2
            });
            WRlayer.setMap(map);
        });

    },
    addParcAreas: function (layer) {
        var PAlayer = layer;
        utils.readJsonFile('/data/parken.json', function (text) {
            var data = JSON.parse(text);
            PAlayer.addGeoJson(data);
            PAlayer.setStyle({
                fillColor: '#6caa9a',
                strokeWeight: 0,
                fillOpacity: 0.5
            });
            PAlayer.setMap(map);
        });
    }
};

