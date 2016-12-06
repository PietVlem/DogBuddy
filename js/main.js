(function(){

    //user_data
    if(localStorage.getItem("user_data") === null){
        //load JSON into local storage
        utils.loadJSON_users(function(response) {
            var JSON_userData = JSON.parse(response);
            localStorage.setItem("user_data",JSON.stringify(JSON_userData));
        });
    }
    //hondenvoorzieningen
    if(localStorage.getItem("GEO_Hv") === null){
        utils.loadJSON_HV(function(response){
            var GEOJSON_HV = JSON.parse(response);
            localStorage.setItem("GEO_Hv",JSON.stringify(GEOJSON_HV));
        });
    }


    window.onresize = function(){
        if(window.location.pathname == '/map_desktop.html' && window.innerWidth < 480){
            window.location = 'map.html';
        }
        if(window.location.pathname == '/map.html' && window.innerWidth > 480){
            window.location = 'map_desktop.html';
        }
    }

})();

var local_storage_usrs = JSON.parse(localStorage.user_data);
console.log(local_storage_usrs);

var local_storage_Hv = JSON.parse(localStorage.GEO_Hv);
console.log(local_storage_Hv);





//read in xml file
//readXML('https://datatank.stad.gent/4/infrastructuur/hondenvoorzieningen.xml');
