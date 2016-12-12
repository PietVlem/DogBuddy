/**
 * Created by Pieter on 05/12/16.
 */

(function(){


    //profile info
    if(window.location.pathname == '/profiel/'){
        console.log("init...");
        var output_div = document.querySelector("#profile_info");
        var text =
            "<p> Gebruiker: " + JSON.parse(localStorage.user_data)[localStorage.Logged_in_usr_id].usrname +"<br>"+
            "Geboortedatum: " + JSON.parse(localStorage.user_data)[localStorage.Logged_in_usr_id].birthdate+ "</p>";
        output_div.innerHTML = text;
    }


    if(window.location.pathname == '/verander_wachtwoord/'){
        var form_ww = document.querySelector("#WW_change");
        form_ww.onsubmit = function(){
            changeWW();
        };

        function changeWW(){
            var old_password = form_ww[name="old_ww"].value;
            var new_password = form_ww[name="new_ww"].value;
            var re_new_password = form_ww[name="re_ww"].value;
            var current_password = local_storage_usrs[localStorage.Logged_in_usr_id].password;

            if(current_password == old_password){
                if(new_password == re_new_password){
                    if(new_password.length >= 5){
                        local_storage_usrs[localStorage.Logged_in_usr_id]['password'] = new_password;
                        localStorage.setItem("user_data",JSON.stringify(local_storage_usrs));
                        console.log(local_storage_usrs);
                        window.alert("password changed!");
                        //window.location = "/profiel/";
                    }
                    else {
                        window.alert("Your new password must be atleast 5 characters long!");
                    }
                }
                else {
                    window.alert("Your new passwords don't match!");
                }
            }
            else {
                window.alert("Your current password is wrong!");
            }
        }
    }




})();