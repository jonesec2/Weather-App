////////////////////////////////////////////////////////////////////////////////////////
// Works the tab feature                                           /////////////////////
////////////////////////////////////////////////////////////////////////////////////////

$(function () {
    $("#tabs").tabs();
});

////////////////////////////////////////////////////////////////////////////////////////
// Creates the time for dates                                      /////////////////////
////////////////////////////////////////////////////////////////////////////////////////

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


////////////////////////////////////////////////////////////////////////////////////////
// Sets up the API                                                 /////////////////////
////////////////////////////////////////////////////////////////////////////////////////

var apiKey = "285389a3277aea781676df3316670296"


////////////////////////////////////////////////////////////////////////////////////////
// Creates the on click even to create the weather cards           /////////////////////
////////////////////////////////////////////////////////////////////////////////////////

$('#cityInput').on("click", function () {
    event.preventDefault();
    var cityName = $('#inputCity').val().trim();
    console.log(cityName)

    ////////////////////////////////////////////////////////////////////////////////////////
    // Creates first ajax call                                         /////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////
    var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=" + apiKey
    console.log(cityURL)
    $.ajax({
        url: cityURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        ////////////////////////////////////////////////////////////////////////////////////////
        // Creating the city buttons the user searches for                 /////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////

        var cityResponse = $('#inputCity').val().trim();

        var newCity = $('<div>');
        newCity.html(/*html*/`
        <div class="newCity">
            <button class="cityFont py-2 pl-4 border rounded"> ${cityResponse}</button>
        </div>
        `)

        ////////////////////////////////////////////////////////////////////////////////////////
        // Creating the weather format and cards                            ////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////

        // empties the weather from the previous city
        $('#clear').empty();

        $('.weatherCards').empty();

        // weather variables for weather cards
        var weatherDescription = response.weather[0].description;
        var weatherName = response.weather[0].main;
        var weatherTemp = response.main.temp
        var weatherHum = response.main.humidity
        var weatherWind = response.wind.speed
        var weatherImage = response.weather[0].icon
        var weatherCityID = response.id
        console.log(weatherCityID)
        //<div class="weatherFont">Description: ${weatherDescription}</div>


        var newWeather = $('<div>')
        newWeather.html(/*html*/`
        <div class="box mx-1">
            <div class="row">
                <h2 class="col-6 mb-0 pr-0  weatherCity"> ${cityResponse} <img src="http://openweathermap.org/img/wn/${weatherImage}@2x.png" height="80px" width="80px"></h2>
                <div class="col-3 pl-0 box wN"> ${weatherName}</div>
            </div> 
            <div class="weatherTitle col-" >Weather Details</div>
            <hr class="mt-1 mb-1">
            <div class ="row">
                <div class="col-4 weatherTemp"> Temperature: ${weatherTemp} </div>
                <div class="col-4 weatherHum"> Humidity: ${weatherHum}%</div>
            </div>
            <div class ="row">
                <div class="col-4 uvIndex"></div>
                <div class="col-8 weatherHum"> Wind Speed: ${weatherWind}MPH</div>
            </div>
            <div class='row weatherCards'>
                <div class="cardOne">test</div>
                
            </div
        </div>
        `)

        //
        // Second API call
        //
        var weatherLat = response.coord.lat
        var weatherLon = response.coord.lon

        function secondAjax() {
            var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + weatherLat + "&lon=" + weatherLon + "&cnt=5"
            console.log(uvURL)

            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response) {
                console.log(response)

                var uvIndex = response.value
                $('.uvIndex').append("UV Index: ", uvIndex)
                console.log(uvIndex)
            })
        }
        secondAjax();

        //
        // Thrid API call
        //

        function thirdAjax() {
            var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?id=" + weatherCityID + "&units=imperial&APPID=" + apiKey
            console.log(forecastURL)

            $.ajax({
                url: forecastURL,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                var tomorrowName = response.list[3].weather[0].main;
                var tomorrowTemp = response.list[3].main.temp
                var tomorrowHum = response.list[3].main.humidity
                var tomorrowWind = response.list[3].wind.speed
                var tomorrowImage = response.list[3].weather[0].icon

                var tomorrowCard = $('<div class="card">')

                tomorrowCard.html(/*html*/
                    `
                    <div class="col-3 border rounded ml-1>
                        <div>${tomorrowName}</div>
                        <img src="http://openweathermap.org/img/wn/tomorrowImage@2x.png" height="30px" width="30px">
                        <div>${tomorrowTemp}</div>
                        <div>${tomorrowHum}</div>
                        <div>${tomorrowWind}</div>
                    </div
                    `)

                $('.weatherCards').append(tomorrowCard)
            })
        }
        thirdAjax();

        // adds the response to the page
        $('.weatherCards').prepend(newWeather)
        $('#cityGoesHere').prepend(newCity)
        cityName = $('#inputCity').val('')

    })

})

// if I make a UV forecast tab
//$('#clearTwo').empty();