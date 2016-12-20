/**
 * Created by Pieter on 29/11/16.
 */

var utils = {
    readJsonFile: function (file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        };
        rawFile.send(null);
    },
    getGEOLocationByPromise: function () {
        return new Promise(function (resolve, reject) {
            if (Modernizr.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        resolve(position);
                    },
                    function (error) {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                console.log("User did not share geolocation data");
                                break;
                            case error.POSITION_UNAVAILABLE:
                                console.log("Could not detect current position");
                                break;
                            case error.TIMEOUT:
                                console.log("Retrieving position timed out");
                                break;
                            default:
                                console.log("Unknown Error");
                                break;
                        }
                        reject(error);
                    },
                    {timeout: 10000, enableHighAccuracy: true}
                )
            }
            else {
                reject("HTML5 Geolocation not supported!");
            }
        });
    }
};


