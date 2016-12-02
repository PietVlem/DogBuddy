(function(){

    if(localStorage.getItem("user_data") === null){
        //load JSON into local storage
        utils.loadJSON(function(response) {
            var JSON_userData = JSON.parse(response);
            localStorage.setItem("user_data",JSON.stringify(JSON_userData));
        });
    }
})();

//data globaal ter beschikking stellen
var local_storage_usrs = JSON.parse(localStorage.user_data);
console.log(local_storage_usrs);

//read in xml file
//readXML('https://datatank.stad.gent/4/milieuennatuur/parken.xml');
