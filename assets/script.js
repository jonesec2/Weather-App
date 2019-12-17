//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Works the tab feature                                                                 /////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(function () {
    $("#tabs").tabs();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Creates the time for dates                                                            /////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

var today = new Date();
var dd = today.getDate();

var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}

today = mm + '/' + dd + '/' + yyyy;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sets up the API                                                                       /////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// api key: 285389a3277aea781676df3316670296
var apiKey = "285389a3277aea781676df3316670296"


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Creates the on click even to create the weather cards                                 /////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        var weatherImage = response.weather[0].icon


        var newWeather = $('<div>')
        newWeather.html(/*html*/`
        <div class="mx-1">
            <h2 class="weatherCity"> ${cityResponse} ${weatherImage}</h2> 
            <div class="date">(${today}) ${weatherName}</div>
            <br>
            <div class="weatherTemp"> Temperature: ${weatherTemp}</div>
            <div class="weatherHum"> Humidity: ${weatherHum}</div>
            <div class="weatherHum"> Wind Speed: ${weatherWind} MPH</div>
            <div class="weatherFont"> Description: ${weatherDescription}</div>
        </div>
        <div>

        </div>
        `)

        // adds the response to the page
        $('.weatherCards').prepend(newWeather)
        $('#cityGoesHere').prepend(newCity)
        cityName = $('#inputCity').val('')

    })

})
