(function () {

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
            + '&libraries=places&callback=initGoogleMaps';
        document.body.insertBefore(script, document.querySelector('#google_script'));


        if (window.location.pathname == '/map_desktop/') {
            this.initGoogleMaps = function () {
                GMap.initMap();
                WRlayer = new google.maps.Data();
                PAlayer = new google.maps.Data();

                var input = document.getElementById('search');
                var searchBox = new google.maps.places.SearchBox(input);

                // Bias the SearchBox results towards current map's viewport.
                map.addListener('bounds_changed', function () {
                    searchBox.setBounds(map.getBounds());
                });

                var markers = [];
                // Listen for the event fired when the user selects a prediction and retrieve
                // more details for that place.
                searchBox.addListener('places_changed', function () {
                    var places = searchBox.getPlaces();

                    if (places.length == 0) {
                        return;
                    }

                    // Clear out the old markers.
                    markers.forEach(function (marker) {
                        marker.setMap(null);
                    });
                    markers = [];

                    // For each place, get the icon, name and location.
                    var bounds = new google.maps.LatLngBounds();
                    places.forEach(function (place) {
                        if (!place.geometry) {
                            console.log("Returned place contains no geometry");
                            return;
                        }
                        var icon = {
                            url: place.icon,
                            size: new google.maps.Size(71, 71),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(17, 34),
                            scaledSize: new google.maps.Size(50, 50)
                        };

                        // Create a marker for each place.
                        markers.push(new google.maps.Marker({
                            map: map,
                            icon: icon,
                            title: place.name,
                            position: place.geometry.location
                        }));

                        if (place.geometry.viewport) {
                            // Only geocodes have viewport.
                            bounds.union(place.geometry.viewport);
                        } else {
                            bounds.extend(place.geometry.location);
                        }
                    });
                    map.fitBounds(bounds);
                    map.setOptions({zoom: 14});
                });

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
                if (document.querySelector("#Dierenartsen").checked == true) {
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

                if (window.innerWidth <= 480) {
                    document.querySelector("#map").style.display = "block";

                    currentYPosition();
                    elmYPosition('map');
                    smoothScroll('map');

                    function currentYPosition() {
                        // Firefox, Chrome, Opera, Safari
                        if (self.pageYOffset) return self.pageYOffset;
                        // Internet Explorer 6 - standards mode
                        if (document.documentElement && document.documentElement.scrollTop)
                            return document.documentElement.scrollTop;
                        // Internet Explorer 6, 7 and 8
                        if (document.body.scrollTop) return document.body.scrollTop;
                        return 0;
                    }

                    function elmYPosition(eID) {
                        var elm = document.getElementById(eID);
                        var y = elm.offsetTop;
                        var node = elm;
                        while (node.offsetParent && node.offsetParent != document.body) {
                            node = node.offsetParent;
                            y += node.offsetTop;
                        }
                        return y;
                    }

                    function smoothScroll(eID) {
                        var startY = currentYPosition();
                        var stopY = elmYPosition(eID);
                        var distance = stopY > startY ? stopY - startY : startY - stopY;
                        if (distance < 100) {
                            scrollTo(0, stopY);
                            return;
                        }
                        var speed = Math.round(distance / 100);
                        if (speed >= 20) speed = 10;
                        var step = Math.round(distance / 25);
                        var leapY = stopY > startY ? startY + step : startY - step;
                        var timer = 0;
                        if (stopY > startY) {
                            for (var i = startY; i < stopY; i += step) {
                                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                                leapY += step;
                                if (leapY > stopY) leapY = stopY;
                                timer++;
                            }
                            return;
                        }
                        for (var i = startY; i > stopY; i -= step) {
                            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                            leapY -= step;
                            if (leapY < stopY) leapY = stopY;
                            timer++;
                        }
                    }
                }
            };
        }
        if (window.location.pathname == '/map/') {
            utils.getGEOLocationByPromise;
            var mappe = document.querySelector('#map');
            mappe.style.display = "block";
            mappe.style.height = "calc(100vh - 50px)";
            this.initGoogleMaps = function () {
                PAlayer = new google.maps.Data();
                GMap.initMap();
                GMap.addMarkerHV(dataHV);
                GMap.addMarkerDoctors(DataDA);
                GMap.addMarkerStores(DataDW);
                GMap.addMarkerBarber(DataHK);
                GMap.addParcAreas(PAlayer);

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        map.setOptions({zoom: 16});

                        map.setCenter(pos);
                    }, function() {
                        window.alert("U gaf geen toestemming om uw loactie te weergeven!");
                    });
                } else {
                    // Browser doesn't support Geolocation
                    window.alert("browser does not support sharing your location");
                }
            }
        }

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
                DataDA[i].address + "<br>" +
                DataDA[i].phone +
                '<div class="button_map" data-id="' + DataDA[i].id + '">Favoriet</div>';
            GMap.bindInfoWindow(marker, map, this.infowindow, info, DataDA);
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
                DataDW[i].address + "<br>" +
                DataDW[i].phone
                +
                '<div class="button_map" data-id="' + DataDW[i].id + '">Favoriet</div>';
            GMap.bindInfoWindow(marker, map, this.infowindow, info, DataDW);
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
                DataHK[i].address + "<br>" +
                DataHK[i].phone +
                '<div class="button_map" data-id="' + DataHK[i].id + '">Favoriet</div>';
            GMap.bindInfoWindow(marker, map, this.infowindow, info, DataHK);
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
    bindInfoWindow: function (marker, map, infoWindow, html, data) {
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
            document.querySelector('.button_map').addEventListener('click', function (ev) {
                var id = this.dataset.id;
                console.log("id: " + id);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == id) {
                        var favorieten = JSON.parse(localStorage.favorites);
                        this.favorites = favorieten;
                        console.log("init..");
                        var obj = {
                            "name": data[i].name,
                            "address": data[i].address,
                            "type": data[i].type
                        };
                        console.log(obj);
                        this.favorites.push(obj);
                        localStorage.setItem("favorites", JSON.stringify(this.favorites));

                    }
                }
            });
        });
    }
};