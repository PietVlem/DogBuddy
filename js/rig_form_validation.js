(function () {

    console.log("form_validation.js loaded");
    var form_reg = document.querySelector('#reg_from');
    form_reg.onsubmit = function () {
        handleFormSubmit();
    };

    function handleFormSubmit() {
        event.preventDefault();

        //waarden uit velden halen
        var username = form_reg[name = "usrname"].value;
        var email = form_reg[name = "email"].value;
        var birthdate = form_reg[name = "birthdate"].value;
        var password = form_reg[name = "password"].value;
        var repassword = form_reg[name = "repassword"].value;

        var users = [];

        //usrname, pw, e-mail ,geboortedatum check
        var usrn_longer_then_five = false;
        var pw_longer_then_five = false;
        var datum_validation = false;
        var email_valdation = false;
        var mail_pattern = /^[a-z0-9]+(([-_.]*[a-z0-9])*)+[@]{1}[a-z0-9]+([.]{1}[c]+[o]+[m])+$/i;
        var date_pattern = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;

        if (username.length >= 5) {
            usrn_longer_then_five = true;
        }
        if (password.length >= 5) {
            pw_longer_then_five = true;
        }
        if (mail_pattern.test(email)) {
            email_valdation = true;
        }
        if (date_pattern.test(birthdate)) {
            datum_validation = true;
        }
        if (usrn_longer_then_five && pw_longer_then_five && email_valdation && datum_validation) {
            //alle users uit json halen met een for-lus en in de array usere steken
            for (i = 0; i < local_storage_usrs.length; i++) {
                var name = local_storage_usrs[i].usrname;
                users.push(name);
            }

            //does the username exist yet?
            var username_does_not_exist = true;

            for (i = 0; i < users.length; i++) {
                if (users[i] == username) {
                    window.alert("User with that username already exists!");
                    username_does_not_exist = false;
                    break;
                }
            }
            //create new user if the usrname didn't exist already!
            if (username_does_not_exist) {
                //kijken of wachtwoorden gelijk zijn
                if (password == repassword) {

                    //create new usr object
                    var new_usr = {
                        "usrname": username,
                        "email": email,
                        "birthdate": birthdate,
                        "password": password,
                        "saved_places": []
                    };

                    //add object to array
                    local_storage_usrs.push(new_usr);

                    //make json from new array with new usr
                    localStorage.setItem("user_data", JSON.stringify(local_storage_usrs));
                    console.log(local_storage_usrs);


                    //keer trg naar inlogscherm
                    window.alert("New user created, you can log in now!");
                    window.location = "../";

                }
                else {
                    window.alert("Ingegeven wachtwoorden komen niet overeen, probeer opnieuw!");
                }
            }

        }
        else {
            window.alert("Gebruikersnaam/wachtwoord moet langer zijn dan 5 characters. E-mail/geboortedatum is niet correct.");
        }
    }
})();