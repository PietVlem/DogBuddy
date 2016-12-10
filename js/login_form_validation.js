/**
 * Created by Pieter on 30/11/16.
 */

(function(){

    if(window.location.pathname == '/index.html' || window.location.pathname == '/'){
        var inlogForm = document.querySelector("#inlogForm");

        inlogForm.onsubmit = function(){
            handleFormSubmitLogIn();
        };

        function handleFormSubmitLogIn(){
            event.preventDefault();

            var usrname = inlogForm[name="login"].value;
            var password = inlogForm[name="password"].value;

            console.log(local_storage_usrs);


            var count = 0;
            //kijken of de user bestaat
            for (i = 0; i < local_storage_usrs.length; i++) {
                if(usrname != local_storage_usrs[i].usrname){
                    count +=1;
                    continue;
                }
                else {
                    console.log("else...");
                    if(password != local_storage_usrs[i].password){
                        console.log("user exists - password incorrect");
                        window.alert("username and/or password are in correct");
                        break;
                    }
                    else {
                        console.log("usr exist - password correct");
                        //window.alert("logging in...");
                        localStorage.setItem("Logged_in_usr_id",i);

                        if(window.innerWidth > 480){
                            window.location = "MAP_Desktop/";
                        }
                        else {
                            window.location = "home/";
                        }



                    }
                }
            };
            if(count == local_storage_usrs.length){
                window.alert("username and/or password are incorrect");

            }
        };
    }



})();