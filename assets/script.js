$(function () {
    $("#tabs").tabs();
});

var cityName = $('#cityInput').val().trim();

var cityURL = "api.openweathermap.org/data/2.5/weather?q=" + cityName