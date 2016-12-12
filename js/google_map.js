/**
 * Created by Pieter on 01/12/16.
 *
 */


(function () {

    /*
     utils.getGEOLocationByPromise();
     console.log(navigator.geolocation);
     */

    if (window.location.pathname == '/map_desktop/' || window.location.pathname == '/map/') {

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

        //laden dierenwinkels
        var DataDW = {};
        utils.readJsonFile('/data/dieren_winkels.json', function (text) {
            DataDW = JSON.parse(text);
        });

        //laden honden kapsalons
        var DataHK = {};
        utils.readJsonFile('/data/honden_kapsalon.json', function (text) {
            DataHK = JSON.parse(text);
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
            WRlayer = new google.maps.Data();
            PAlayer = new google.maps.Data();
        };

        var test_btn = document.querySelector("#test_btn");
        test_btn.onclick = function () {
            GMap.hideMarkerHV();
            GMap.hideMarkerDA();
            GMap.hideMarkerStores();
            GMap.hideMarkerBarber();
            WRlayer.setMap(null);
            PAlayer.setMap(null);

            if (document.querySelector("#hVz").checked == true) {
                GMap.addMarkerHV(dataHV);
            }
            if (document.querySelector("#artsen").checked == true) {
                GMap.addMarkerDoctors(DataDA);
            }
            if (document.querySelector("#dierenwinkels").checked == true) {
                GMap.addMarkerStores(DataDW);
            }
            if (document.querySelector("#hondenkappers").checked == true) {
                GMap.addMarkerBarber(DataHK);
            }
            if (document.querySelector("#parken").checked == true) {
                GMap.addParcAreas(PAlayer);
            }
            if (document.querySelector("#wandelroutes").checked == true) {
                GMap.addLinesWalkingRoutes(WRlayer);
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
        this.DWarray = [];
        this.HKarray = [];
        this.infowindow = new google.maps.InfoWindow();
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
            var info =
                    "<b>" + DataDA[i].name + "</b><br>" +
                    DataDA[i].address +"<br>"+
                    DataDA[i].phone;
            GMap.bindInfoWindow(marker, map, this.infowindow, info);
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
    addMarkerStores: function (DataDW) {
        for (var i = 0; i < DataDW.length; i++) {
            var marker = new google.maps.Marker(
                {
                    position: {lat: DataDW[i].coordinates[0], lng: DataDW[i].coordinates[1]},
                    icon: '/images/store.png'
                }
            );
            marker.setMap(map);
            var info =
                "<b>" + DataDW[i].name + "</b><br>" +
                DataDW[i].address +"<br>"+
                DataDW[i].phone;
            GMap.bindInfoWindow(marker, map, this.infowindow, info);
            this.DWarray.push(marker);
        }
    },
    hideMarkerStores: function () {
        for (var i = 0; i < this.DWarray.length; i++) {
            var marker = this.DWarray[i];
            marker.setVisible(false);
        }
        this.DWarray = [];
    },
    addMarkerBarber: function (DataHK) {
        for (var i = 0; i < DataHK.length; i++) {
            var marker = new google.maps.Marker(
                {
                    position: {lat: DataHK[i].coordinates[0], lng: DataHK[i].coordinates[1]},
                    icon: '/images/kapper.png'
                }
            );
            marker.setMap(map);
            var info =
                "<b>" + DataHK[i].name + "</b><br>" +
                DataHK[i].address +"<br>"+
                DataHK[i].phone;
            GMap.bindInfoWindow(marker, map, this.infowindow, info);
            this.HKarray.push(marker);
        }
    },
    hideMarkerBarber: function () {
        for (var i = 0; i < this.HKarray.length; i++) {
            var marker = this.HKarray[i];
            marker.setVisible(false);
        }
        this.HKarray = [];
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
                strokeColor: '#6caa9a',
                strokeWeight: 1,
                fillOpacity: 0.5
            });
            PAlayer.setMap(map);
        });
    },
    bindInfoWindow: function (marker, map, infoWindow, html) {
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
        });
    }
};

