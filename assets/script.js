$(function () {
    $("#tabs").tabs();
});


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
        console.log(response)

        // var cityResponse = response.city
        // place holder var to test until Ajax is set up
        var cityResponse = $('#inputCity').val().trim();
        var newCity = $('<div>')

        newCity.html(/*html*/`
        
        <div class="">
            <div class="cityFont"> ${cityResponse}</div>

        </div>
                `)

        $('#cityGoesHere').prepend(newCity)
        cityName = $('#inputCity').val('')
    })
    
})
