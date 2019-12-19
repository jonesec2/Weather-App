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

function getCity() {
    $('#cityInput').on("click", function () {
        event.preventDefault();

        //set up var for the users input
        var cityName = $('#inputCity').val().trim();

        /////////////////////////
        // Store search locally
        /////////////////////////


        // for (var i =0; i< local.length;i++){
        var name = []
        console.log(name)
        name.push(cityName)
        console.log(name)
        localStorage.setItem(cityName, cityName)
        var cityButton = localStorage.getItem(cityName)
        console.log(cityButton)
        // }


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
        console.log($('.cityFont').text())
        // console.log($('.cityFont').data())
        var dataObj = $('.cityFont').data()
        var dataName = dataObj.name
        console.log(cityName)
        /////////////////////////
        // Creates first ajax call 
        /////////////////////////
        var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=" + apiKey

        function firstAjax() {
            $.ajax({
                url: cityURL,
                method: "GET"
            }).then(function (response) {
                event.preventDefault();
                console.log(response)

                /////////////////////////
                // Creating the weather format and cards
                /////////////////////////

                // empties the weather from the previous city
                $('#clear').empty();
                $('.weatherCards').empty();
                $('.forecast').empty();
                $('.cardContainer').empty();

                // weather variables for weather cards
                var cityResponse = localStorage.getItem(cityName);
                var weatherName = response.weather[0].main;
                var weatherTemp = response.main.temp
                var weatherHum = response.main.humidity
                var weatherWind = response.wind.speed
                var weatherImage = response.weather[0].icon
                var weatherCityID = response.id

                // creating div for the weather tab card info to live in
                var newWeather = $('<div>')
                //using template literals to get the weather variables to the UI
                newWeather.html(/*html*/`
                
                <div class="box">
                    <div class="row">
                        <h2 class="col-4 mb-0 pr-0  weatherCity"> ${cityName} <img src="http://openweathermap.org/img/wn/${weatherImage}@2x.png" height="80px" width="80px"></h2>
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
                // calls the second function or it won't execute
                secondAjax();


                // Creates the Forecast Div
                var forecast = $('<div>')

                forecast.html(/*html*/`
                <h3 class='fiveDay'>Five day Forecast</h3>
                `)

                $('.forecast').append(forecast)

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
                        <div>${tomorrowName} <img src="http://openweathermap.org/img/wn/${tomorrowImage}@2x.png" height="32px" width="32px"></div>
                        <div>${tomorrowSubstring}</div>
                        <div>Temp: ${tomorrowTemp}&deg</div>
                        <div>Hum: ${tomorrowHum}%</div>
                    </div> `)

                            // appending the new card to the already created div "forecastCards"
                            $('.cardContainer').append(forecastCards)
                        }
                    })
                }
                thirdAjax();

                // adds the response to the page
                $('.weatherCards').prepend(newWeather)
                cityName = $('#inputCity').val('')

            })
        } firstAjax();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function buttonSearch() {
            event.preventDefault();
            $('.cityFont').on("click", function () {
                event.preventDefault();
                $('.uvIndex').empty();
                $('#clear').empty();
                $('.weatherCards').empty();
                $('.forecast').empty();
                $('.cardContainer').empty();

                var dataObj = this.id
                // var dataName = dataObj.name
                // var dataStringify = JSON.stringify(dataName)
                console.log(dataObj)
                
                var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=" + dataObj + "&units=imperial&APPID=" + apiKey
                console.log(dataObj)

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
                        var cityResponse = localStorage.getItem(cityName);
                        var weatherName = response.weather[0].main;
                        var weatherTemp = response.main.temp
                        var weatherHum = response.main.humidity
                        var weatherWind = response.wind.speed
                        var weatherImage = response.weather[0].icon
                        var weatherCityID = response.id

                        // creating div for the weather tab card info to live in
                        var newWeather = $('<div>')
                        //using template literals to get the weather variables to the UI
                        newWeather.html(/*html*/`
                
                            <div class="box">
                                <div class="row">
                                    <h2 class="col-4 mb-0 pr-0  weatherCity"> ${dataObj} <img src="http://openweathermap.org/img/wn/${weatherImage}@2x.png" height="80px" width="80px"></h2>
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
                        // calls the second function or it won't execute
                        secondAjax();
                        


                        // Creates the Forecast Div
                        var forecast = $('<div>')

                        forecast.html(/*html*/`
                            <h3 class='fiveDay'>Five day Forecast</h3>
                            `)

                        $('.forecast').append(forecast)

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
                                        <div>${tomorrowName} <img src="http://openweathermap.org/img/wn/${tomorrowImage}@2x.png" height="32px" width="32px"></div>
                                        <div>${tomorrowSubstring}</div>
                                        <div>Temp: ${tomorrowTemp}&deg</div>
                                        <div>Hum: ${tomorrowHum}%</div>
                                    </div> `)

                                    // appending the new card to the already created div "forecastCards"
                                    $('.cardContainer').append(forecastCards)
                                }
                            })
                        }
                        thirdAjax();

                        // adds the response to the page
                        $('.weatherCards').prepend(newWeather)
                        cityName = $('#inputCity').val('')

                    })
                } firstAjax();
            })

        } buttonSearch();
    })
}
getCity();


