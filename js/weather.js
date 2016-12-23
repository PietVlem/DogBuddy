(function () {

    var Json_weather_gent = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D12591774%20AND%20u%3D%22c%22&format=json&diagnostics=true&callback=';

    if (window.location.pathname =="/weer/"){
        loadData();
    }


    function loadData(){
        var xhr = new XMLHttpRequest();
        xhr.open('get', Json_weather_gent, true);
        xhr.responseType ='json';
        xhr.onload = function(){
            if(xhr.status == 200){
                console.log("Ready for use");
                var data = (!xhr.responseType)? JSON.parse(xhr.response) : xhr.response;
                console.log(data);
                var query = data.query;
                var results = query.results;
                var channel = results.channel;
                var item = channel.item;
                var conditionNow = item.condition;
                var forcast = item.forecast;

                var temStr ='';
                temStr += '<div style="background-color: #98d1c1; text-align: center;margin: auto;" class="weather-widget_today" data-code="' + conditionNow.code + '">';
                temStr += '<time datetime="' + conditionNow.date + '"><p>' + conditionNow.date.substring(0,11) + ' </p></time>';
                temStr += '<div class="weather-widget__city"><p>Gent</p></div>';
                temStr += '<div class="weather-widget__img"><img src="../images/Cloud.png"></div>';
                temStr += '<div class="weather-widget__temp-now"><p>' + conditionNow.temp + ' 	&#186;C</p></div>';
                temStr += '<div class="weather-widget__lowest"><p>Min: ' + forcast[0].low + ' &#186;C</p></div>';
                temStr += '<div class="weather-widget__highest"><p>Max: ' + forcast[0].high + ' &#186;C</p></div>';
                temStr += '</div>';

                document.querySelector("#today").innerHTML += temStr;

                //table
                var forcastDiv ='';
                forcastDiv += '<table style="width: 80%; margin: auto; padding-top: 30px" class="weather-widget-forcast-table data">'
                for (i = 0; i < 3; i++) {
                    forcastDiv += '<tr class="weather-widget" data-code="' + item.forecast[i].code + '">';
                    forcastDiv += '<td style="padding: 10px 0px"><p>' + item.forecast[i].date.substring(0,6) + ' </p></td>';
                    forcastDiv += '<td><p>' + item.forecast[i].day + ' </p></td>';
                    forcastDiv += '<td style="text-align: right"><p>' + item.forecast[i].low+ "-"+ item.forecast[i].high + ' &#186;C</p></td>';
                    forcastDiv += '</tr>';
                }

                forcastDiv += '</table>';
                document.querySelector("#next_days").innerHTML += forcastDiv;



            }
            else {
                console.log("error");
            }
        };
        xhr.onerror = function(){
            console.log('error');
        };
        xhr.send();
    };

})();