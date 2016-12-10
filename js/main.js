(function(){
    //user_data
    if(localStorage.getItem("user_data") === null){
        //load JSON into local storage
        utils.readJsonFile("../data/users_data.json", function(text){
            var data = JSON.parse(text);
            localStorage.setItem("user_data",JSON.stringify(data));
        });
    }
    window.onresize = function(){
        if(window.location.pathname == '/map_desktop.html' && window.innerWidth < 480){
            window.location = '{{site.baseutl}}/MAP_Desktop/';
        }
        if(window.location.pathname == '/map.html' && window.innerWidth > 480){
            window.location = '../pages/map_desktop.html';
        }
    };

})();

var local_storage_usrs = localStorage.user_data;
