(function(){

    function readXML(XMLfile){
        var xml = new XMLHttpRequest();
        xml.open('get',XMLfile,false);
        xml.send();
        var xmlData = xml.responseText;
        console.log(xmlData);
        //document.write(xmlData);
    }
    //readXML('https://datatank.stad.gent/4/milieuennatuur/parken.xml');




})();
