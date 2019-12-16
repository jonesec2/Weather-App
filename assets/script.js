$(function () {
    $("#tabs").tabs();
});

$('#cityInput').on("click", function() {
    event.preventDefault();
    var cityName = $('#cityInput').val().trim();
    console.log(cityName)
    
    var cityURL = "api.openweathermap.org/data/2.5/weather?q=" + cityName

    $.ajax({
        url: cityURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
    })
})
