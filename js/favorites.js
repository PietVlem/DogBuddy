(function () {

    var tabel_favorieten = document.querySelector("#favoriten_tabel");
    var favorieten = JSON.parse(localStorage.favorites);

    console.log(favorieten);

    for(i = 0; i < favorieten.length; i++){
        var img = "";
        switch(favorieten[i].type){
            case "arts":
                img = "../images/arts.png";
                break;
            case "store":
                img = "../images/store.png";
                break;
            case "barber":
                img = "../images/kapper.png";
                break;
        }

        var content =
            "<tr>" +
            "<td><img src='"+img+"'></td>" +
            "<td>"+ "<b>" + favorieten[i].name+"</b><br>" + favorieten[i].address +"</td>" +
            "<td><img class='red_cross' src='../images/crossIcon_red.png' alt=''></td>"+
            "</tr>";
        tabel_favorieten.innerHTML = tabel_favorieten.innerHTML + content;
    }

})();