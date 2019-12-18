/////////////////////////
// Works the tab feature    
/////////////////////////

$(function () {
    $("#tabs").tabs();
});

/////////////////////////
// Creates the time for dates    
/////////////////////////

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

/////////////////////////
// Sets up the API Key   
/////////////////////////

var apiKey = "285389a3277aea781676df3316670296"

/////////////////////////
// Creates the on click even to create the weather cards           
/////////////////////////

$('#cityInput').on("click", function () {
    event.preventDefault();
    var cityName = $('#inputCity').val().trim();
    console.log(cityName)

    /////////////////////////
    // Creates first ajax call 
    /////////////////////////
    var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=" + apiKey
    console.log(cityURL)
    $.ajax({
        url: cityURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        /////////////////////////
        // Creating the city buttons the user searches for                 
        /////////////////////////

        var cityResponse = $('#inputCity').val().trim();

        // creating the new divs the city info will live in
        var newCity = $('<div>');
        newCity.html(/*html*/`
        <div class="newCity">
            <button class="cityFont py-2 pl-4 border rounded"> ${cityResponse}</button>
        </div>
        `)

        /////////////////////////
        // Creating the weather format and cards
        /////////////////////////

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
        //<div class="weatherFont">Description: ${weatherDescription}</div>


        // creating div for the weather tab card info to live in
        var newWeather = $('<div>')
        //using template literals to get the weather variables to the UI
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
            <div class='row forecastCards'>
            </div>
        </div>
        `)

        /////////////////////////
        // Second API call
        // This gets the UV index using city ID #
        ////////////////////////

        // sets the latitude and longitude variables 
        var weatherLat = response.coord.lat
        var weatherLon = response.coord.lon


        // create new function inside the other function for a new ajax request using data from first ajax request
        function secondAjax() {
            var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + weatherLat + "&lon=" + weatherLon + "&cnt=5"
            console.log(uvURL)

            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response) {


                // getting the UV index value
                var uvIndex = response.value
                // adding UV index info to the already created div "uvIndex" created in first ajax function
                $('.uvIndex').append("UV Index: ", uvIndex)
            })
        }
        // calls the second function or it won't execute
        secondAjax();

        /////////////////
        // Third API call
        /////////////////


        // third ajax request to get the 5 day forecast
        function thirdAjax() {
            var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?id=" + weatherCityID + "&units=imperial&APPID=" + apiKey


            $.ajax({
                url: forecastURL,
                method: "GET"
            }).then(function (response) {

                var days = [3, 11, 19, 27]
                for (var i = 0; i < days.length; i++) {
                    // creating the variables to get all of the data I want for the five day forecast
                    var tomorrowName = response.list[days].weather[0].main;
                    var tomorrowTemp = response.list[days].main.temp
                    var tomorrowHum = response.list[days].main.humidity
                    var tomorrowWind = response.list[days].wind.speed
                    var tomorrowImage = response.list[days].weather[0].icon
                    console.log(response)
                    console.log(response.list[days])
                    

                    // creating a div to hold all of the five day forecast
                    var tomorrowCard = $('<div class="col-3 mt-2 border rounded ml-1 card">')

                    // setting the html of the newly created div
                    tomorrowCard.html(/*html*/` 
                    
                    <div>
                        <div>${tomorrowName} <img src="http://openweathermap.org/img/wn/${tomorrowImage}@2x.png" height="32px" width="32px"></div>
                        <div>Temp: ${tomorrowTemp}</div>
                        <div>Hum: ${tomorrowHum}%</div>
                        <div>Wind ${tomorrowWind}MPH</div>
                    </div> 
                    `)

                    // appending the new card to the already created div "forecastCards"
                    $('.forecastCards').append(tomorrowCard)
                }
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