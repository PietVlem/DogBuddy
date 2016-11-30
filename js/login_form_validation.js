/**
 * Created by Pieter on 30/11/16.
 */

(function(){

var inlogForm = document.querySelector("#inlogForm");

inlogForm.onsubmit = function(){
    handleFormSubmitLogIn();
};

function handleFormSubmitLogIn(){
    event.preventDefault();

    var usrname = inlogForm[name="login"].value;
    var password = inlogForm[name="password"].value;


    utils.loadJSON(function(response) {
        // Parse JSON string into array
        var JSON_userData = JSON.parse(response);

        var count = 0;
        //kijken of de user bestaat
        for (i = 0; i < JSON_userData.length; i++) {
            if(usrname != JSON_userData[i].usrname){
                count +=1;
                continue;
            }
            else {
                console.log("else...");
                if(password != JSON_userData[i].password){
                    console.log("user exists - password incorrect");
                    window.alert("username and/or password are in correct");
                    break;
                }
                else {
                    console.log("usr exist - password correct");
                    //window.alert("logging in...");
                    window.location = "home.html";
                }
            }
        };
        if(count == JSON_userData.length){
            window.alert("username and/or password are incorrect");

        }
    });
};

})();
