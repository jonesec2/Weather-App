function buttonSearch() {
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
}
