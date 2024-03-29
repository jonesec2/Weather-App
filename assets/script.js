/////////////////////////
// Works the tab feature    
/////////////////////////


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

var localName = localStorage.getItem('cityNames')

if (localName === null) {

    localName = []
}
else {
    localName = JSON.parse(localName)
    
}


for (var i = 0; i < localName.length; i++) {
    
    var newCity = $('<div>');
    newCity.html(`
        <div class="newCity">
            <button id='${localName[i]}' class="cityFont py-2 pl-4 border rounded">${localName[i]}</button>
        </div>
        `)
    $('#cityGoesHere').prepend(newCity)
}



$('#cityInput').on("click", function () {
    event.preventDefault();

    //set up var for the users input
    var cityName = $('#inputCity').val().trim();
   

    /////////////////////////
    // Store search locally
    /////////////////////////

    
    localName.push(cityName)
    let newLocalName = JSON.stringify(localName)
    localStorage.setItem('cityNames', newLocalName)


    /////////////////////////
    // Creating the city buttons the user searches for                 
    /////////////////////////


    var newCity = $('<div>');
    newCity.html(/*html*/`
            <div class="newCity">
                <button id='${cityName}' class="cityFont py-2 pl-4 border rounded">${cityName}</button>
            </div>
            `)
    $('#cityGoesHere').prepend(newCity)

    var dataObj = $('.cityFont').data()
  
    /////////////////////////
    // Creates first ajax call 
    /////////////////////////
    var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=" + apiKey

    function firstAjax() {
        $.ajax({
            url: cityURL,
            method: "GET"
        }).then(function (response) {
            event.preventDefault();

            /////////////////////////
            // Creating the weather format and cards
            /////////////////////////

            // empties the weather from the previous city
            $('#clear').empty();
            $('.weatherCards').empty();
            $('.forecast').empty();
            $('.cardContainer').empty();

            // weather variables for weather cards
            var weatherName = response.weather[0].main;
            var weatherTemp = response.main.temp
            var weatherHum = response.main.humidity
            var weatherWind = response.wind.speed
            var weatherImage = response.weather[0].icon

            // creating div for the weather tab card info to live in
            var newWeather = $('<div>')
            //using template literals to get the weather variables to the UI
            newWeather.html(/*html*/`
                
                <div class="box">
                    <div class="row">
                        <h2 class="col-4 mb-0 pr-0  weatherCity"> ${cityName} <img src="https://openweathermap.org/img/wn/${weatherImage}@2x.png" height="80px" width="80px"></h2>
                        <div class="col-4 pl-0 box wN">Today's Date: ${today}</div>
                    </div>
                    <div> ${weatherName}</div>
                    <br>
                    <div class="weatherTitle">Weather Details</div>
                    <hr class="mt-1 mb-1">
                    <div class ="row py-2">
                        <div class="col-4 weatherTemp"> Temperature: ${weatherTemp}&deg </div>
                        <div class="col-4 weatherHum"> Humidity: ${weatherHum}%</div>
                    </div>
                    <div class ="row">
                        <div class="col-4 uvIndex"></div>
                        <div class="col-8 pb-2 weatherWind"> Wind Speed: ${weatherWind}MPH</div>
                    </div>
                </div>
                <hr class='mt-1 mb-2'>
                `)

            // Creates the Forecast Div
            var forecast = $('<div>')

            forecast.html(/*html*/`
                <h3 class='fiveDay'>Five day Forecast</h3>
                `)

            $('.forecast').append(forecast)

            //define arguments
            secondAjax(apiKey, response.coord.lat, response.coord.lon);
            //define arguments
            thirdAjax(response.id, apiKey);

            // adds the response to the page
            $('.weatherCards').prepend(newWeather)
            cityName = $('#inputCity').val('')

        })
    } firstAjax();
})



$('.cityFont').on("click", function  () {

    $('.uvIndex').empty();
    $('#clear').empty();
    $('.weatherCards').empty();
    $('.forecast').empty();
    $('.cardContainer').empty();

    var dataObj = this.id


    var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + dataObj + "&units=imperial&APPID=" + apiKey


    function buttonAjax() {
        $.ajax({
            url: cityURL,
            method: "GET"
        }).then(function (response) {
            event.preventDefault();

            /////////////////////////
            // Creating the weather format and cards
            /////////////////////////

            // empties the weather from the previous city
            $('#clear').empty();
            $('.weatherCards').empty();
            $('.forecast').empty();
            $('.cardContainer').empty();

            // weather variables for weather cards
            // var cityResponse = localStorage.getItem(cityName);
            var weatherName = response.weather[0].main;
            var weatherTemp = response.main.temp
            var weatherHum = response.main.humidity
            var weatherWind = response.wind.speed
            var weatherImage = response.weather[0].icon

            // creating div for the weather tab card info to live in
            var newWeather = $('<div>')
            //using template literals to get the weather variables to the UI
            newWeather.html(/*html*/`
            
                        <div class="box">
                            <div class="row">
                                <h2 class="col-4 mb-0 pr-0  weatherCity"> ${dataObj} <img src="https://openweathermap.org/img/wn/${weatherImage}@2x.png" height="80px" width="80px"></h2>
                                <div class="col-4 pl-0 box wN">Today's Date: ${today}</div>
                            </div>
                            <div> ${weatherName}</div>
                            <br>
                            <div class="weatherTitle">Weather Details</div>
                            <hr class="mt-1 mb-1">
                            <div class ="row py-2">
                                <div class="col-4 weatherTemp"> Temperature: ${weatherTemp}&deg </div>
                                <div class="col-4 weatherHum"> Humidity: ${weatherHum}%</div>
                            </div>
                            <div class ="row">
                                <div class="col-4 uvIndex"></div>
                                <div class="col-8 pb-2 weatherWind"> Wind Speed: ${weatherWind}MPH</div>
                            </div>
                        </div>
                        <hr class='mt-1 mb-2'>
                        `)

            // Creates the Forecast Div
            var forecast = $('<div>')

            forecast.html(/*html*/`
                        <h3 class='fiveDay'>Five day Forecast</h3>
                        `)

            //define arguments
            secondAjax(apiKey, response.coord.lat, response.coord.lon);
            //define arguments
            thirdAjax(response.id, apiKey);
            $('.forecast').append(forecast)

            // adds the response to the page
            $('.weatherCards').prepend(newWeather)
            cityName = $('#inputCity').val('')

        })
    } buttonAjax();
})

/////////////////////////
// Second API call
// This gets the UV index using city ID #
////////////////////////

// create new function inside the other function for a new ajax request using data from first ajax request
// give parameters
function secondAjax(apiKey, weatherLat, weatherLon) {

    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + weatherLat + "&lon=" + weatherLon + "&cnt=5"

    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (response) {
        event.preventDefault();


        // getting the UV index value
        var uvIndex = response.value
        // adding UV index info to the already created div "uvIndex" created in first ajax function
        $('.uvIndex').append("UV Index: ", uvIndex)
    })
}
/////////////////
// Third API call
/////////////////

// third ajax request to get the 5 day forecast
//give parameters
function thirdAjax(weatherCityID, apiKey) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + weatherCityID + "&units=imperial&APPID=" + apiKey

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        event.preventDefault();

        var days = [0, 7, 15, 23, 31]
        var titles = ["Tonight", "Tomorrow", "Day Three", "Day Four", "Day Five"]
        for (var i = 0; i < days.length; i++) {
            // creating the variables to get all of the data I want for the five day forecast
            var tomorrowName = response.list[days[i]].weather[0].main;
            var tomorrowTemp = response.list[days[i]].main.temp;
            var tomorrowHum = response.list[days[i]].main.humidity;
            var tomorrowDate = response.list[days[i]].dt_txt;
            var tomorrowSubstring = tomorrowDate.substring(0, 10)
            var tomorrowImage = response.list[days[i]].weather[0].icon;


            // creating a div to hold all of the five day forecast
            var forecastCards = $('<div class="col-12 col-md-2 mx-auto my-2 cards border rounded">')

            // setting the html of the newly created div
            forecastCards.html(/*html*/` 
                    
                    <div class='dayTitle'>${titles[i]}</div>
                    <hr class=' my-0 cardHr'>
                    <div>
                        <div>${tomorrowName} <img src="https://openweathermap.org/img/wn/${tomorrowImage}@2x.png" height="32px" width="32px"></div>
                        <div>${tomorrowSubstring}</div>
                        <div>Temp: ${tomorrowTemp}&deg</div>
                        <div>Hum: ${tomorrowHum}%</div>
                    </div> `)

            // appending the new card to the already created div "forecastCards"
            $('.cardContainer').append(forecastCards)
        }
    })
}
