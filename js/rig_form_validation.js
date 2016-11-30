/**
 * Created by Pieter on 28/11/16.
 */

/*
{
    "Gebruikersnaam":"Pieter";
    "E-mail":"Pieter.vlem@gmail.com",
    "Geboortedatum":"15/11/1994";
    "wachtwoord":"toffeFlieter123";
    "Saved places": ["citadelpark", "blaremeersen"]
}
*/

(function(){

console.log("form_validation.js loaded");
var form = document.querySelector('#reg_from');
form.onsubmit=function(){
    handleFormSubmit();
};

function handleFormSubmit(){
    event.preventDefault();

    //waarden uit velden halen
    var username = form[name="usrname"].value;
    var email = form[name="email"].value;
    var birthdate = form[name="birthdate"].value;
    var password = form[name="password"].value;
    var repassword = form[name="repassword"].value;

    var users = [];

    //e-mail check

    //de json laden en kijken of de usrname al bestaat
    utils.loadJSON(function(response) {
        // Parse JSON string into object
        var JSON_userData = JSON.parse(response);

        //alle users uit json halen met een for-lus en in de array usere steken
        for (i = 0; i < JSON_userData.length; i++) {
            var name = JSON_userData[i].usrname;
            users.push(name);
        }

        //does the username exist yet?
        var username_does_not_exist = true;

        for(i = 0; i < users.length; i++){
            if(users[i] == username){
                window.alert("User with that username already exists!");
                username_does_not_exist = false;
                break;
            }
        }
        //create new user id the usrname didn't exist already!
        if(username_does_not_exist){
            console.log("username_does_not_exist..");
            //kijken of wachtwoorden gelijk zijn
            if(password == repassword){

                //create new usr object
                var new_usr = {
                    "usrname":username,
                    "email":email,
                    "birthdate":birthdate,
                    "password":password
                };

                //add object to array
                JSON_userData.push(new_usr);

                //make json from new array with new usr
                var new_JSON_usderDate = JSON.stringify(JSON_userData);
                console.log(new_JSON_usderDate);


                //keer trg naar inlogscherm
                window.alert("New user created, you can log in now!");
                //window.location = "index.html";

            }
            else {
                window.alert("Ingegeven wachtwoorden komen niet overeen, probeer opnieuw!");
            }
        }




    });
}
})();






