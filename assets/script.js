$(function () {
    $("#tabs").tabs();
});

///////////////////////////////////
// creates variables for Time
var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 

today = mm+'/'+dd+'/'+yyyy;

///////////////////////////
// api key: 285389a3277aea781676df3316670296
var apiKey = "285389a3277aea781676df3316670296"

$('#cityInput').on("click", function () {
    event.preventDefault();
    var cityName = $('#inputCity').val().trim();
    console.log(cityName)

    // var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=London&APPID=285389a3277aea781676df3316670296"
    var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey
    console.log(cityURL)
    $.ajax({
        url: cityURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // var cityResponse = response.city
        // place holder var to test until Ajax is set up

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Creating the city buttons the user searches for                                      /////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var cityResponse = $('#inputCity').val().trim();

        var newCity = $('<div>');
        newCity.html(/*html*/`
        <div>
            <button class="cityFont py-2 pl-4 border rounded"> ${cityResponse}</button>
        </div>
        `)

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Creating the weather format and cards                                                  ////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        // empties the weather from the previous city
        $('.weatherCards').empty();

        // weather variables for weather cards
        var weatherDescription = response.weather[0].description;
        var weatherName = response.weather[0].main;
        var weatherTemp = response.main.temp
        var weatherHum = response.main.humidity
        var weatherWind = response.wind.speed


        var newWeather = $('<div>')
        newWeather.html(/*html*/`
        <div class="mx-1">
            <h2 class="weatherCity"> ${cityResponse} </h2> 
            <div class="date">(${today}) ${weatherName}</div>
            <br>
            <div class="weatherTemp"> Temperature: ${weatherTemp}</div>
            <div class="weatherHum"> Humidity: ${weatherHum}</div>
            <div class="weatherHum"> Wind Speed: ${weatherWind} MPH</div>
            <div class="weatherFont"> ${weatherDescription}</div>
        </div>
        <div>

        </div>
        `)

        $('.weatherCards').prepend(newWeather)
        $('#cityGoesHere').prepend(newCity)
        cityName = $('#inputCity').val('')

    })

})
