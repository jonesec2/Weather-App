
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
            //
            $('.cityFont').on("click", buttonSearch)

            // adds the response to the page
            $('.weatherCards').prepend(newWeather)
            cityName = $('#inputCity').val('')

        })
    } firstAjax();
})