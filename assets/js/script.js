var searchBar = document.getElementById('searchBar');
var searchBtn = document.getElementById('searchBtn');
var cityContainer = document.querySelector('.one');


cityName = document.getElementById('city-name')
currentTemp = document.getElementById('temp')
currentWind = document.getElementById('wind')
currentHumidity = document.getElementById('humidity')
currentUVIndex = document.getElementById('uv-index')

var dayOneTemp = document.getElementById('day-one-temp');
var dayTwoTemp = document.getElementById('day-two-temp');
var dayThreeTemp = document.getElementById('day-three-temp');
var dayFourTemp = document.getElementById('day-four-temp');
var dayFiveTemp = document.getElementById('day-five-temp');

var dayOneWind = document.getElementById('day-one-wind');
var dayTwoWind = document.getElementById('day-two-wind');
var dayThreeWind = document.getElementById('day-three-wind');
var dayFourWind = document.getElementById('day-four-wind');
var dayFiveWind = document.getElementById('day-five-wind');

var dayOneHumidity = document.getElementById('day-one-humidity');
var dayTwoHumidity = document.getElementById('day-two-humidity');
var dayThreeHumidity = document.getElementById('day-three-humidity');
var dayFourHumidity = document.getElementById('day-four-humidity');
var dayFiveHumidity = document.getElementById('day-five-humidity');



searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var searchedCity = searchBar.value;
    console.log(searchedCity);
    apiWeatherData(searchedCity);
})


function apiWeatherData(searchedCity) {
    var completeURLCurrentWeatherData = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=37e98eb8e58cfe49e4e0561295e9fd4d`;
    console.log(completeURLCurrentWeatherData);
    fetch(completeURLCurrentWeatherData)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var chosenCity = data.name;
            cityName.innerHTML = chosenCity;

            var chosenCityTemp = data.main.temp;
            currentTemp.innerHTML = `Temp: ${chosenCityTemp} F`;

            var chosenCityWind = data.wind.speed;
            currentWind.innerHTML = `Wind: ${chosenCityWind} MPH`;

            var chosenCityHumidity = data.main.humidity;
            currentHumidity.innerHTML = `Humidy: ${chosenCityHumidity} %`;



            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var completeURLFiveDayForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=imperial&appid=37e98eb8e58cfe49e4e0561295e9fd4d`;
            console.log(completeURLFiveDayForecast);
            fetch(completeURLFiveDayForecast)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);

                    //Current Day UVI (CANNOT BE OBTAINED THROUGH CURRENT DAY API)
                    var chosenCityUVIndex = data.daily[0].uvi;
                    currentUVIndex.innerHTML = `UV Index: ${chosenCityUVIndex}`;


                    //Day 1 Forecast
                    var chosenOneTemp = data.daily[1].temp.day;
                    dayOneTemp.innerHTML = `${chosenOneTemp} F`;

                    var chosenOneWind = data.daily[1].wind_speed;
                    dayOneWind.innerHTML = `${chosenOneWind} mph`;

                    var chosenOneHumidity = data.daily[1].humidity;
                    dayOneHumidity.innerHTML = `${chosenOneHumidity} %`


                    //Day 2 Forecast
                    var chosenTwoTemp = data.daily[2].temp.day;
                    dayTwoTemp.innerHTML = `${chosenTwoTemp} F`;

                    var chosenTwoWind = data.daily[2].wind_speed;
                    dayTwoWind.innerHTML = `${chosenTwoWind} mph`;

                    var chosenTwoHumidity = data.daily[2].humidity;
                    dayTwoHumidity.innerHTML = `${chosenTwoHumidity} %`


                    //Day 3 Forecast
                    var chosenThreeTemp = data.daily[3].temp.day;
                    dayThreeTemp.innerHTML = `${chosenThreeTemp} F`;

                    var chosenThreeWind = data.daily[3].wind_speed;
                    dayThreeWind.innerHTML = `${chosenThreeWind} mph`;

                    var chosenThreeHumidity = data.daily[3].humidity;
                    dayThreeHumidity.innerHTML = `${chosenThreeHumidity} %`


                    //Day 4 Forecast
                    var chosenFourTemp = data.daily[4].temp.day;
                    dayFourTemp.innerHTML = `${chosenFourTemp} F`;

                    var chosenFourWind = data.daily[4].wind_speed;
                    dayFourWind.innerHTML = `${chosenFourWind} mph`;

                    var chosenFourHumidity = data.daily[4].humidity;
                    dayFourHumidity.innerHTML = `${chosenFourHumidity} %`


                    //Day 5 Forecast
                    var chosenFiveTemp = data.daily[5].temp.day;
                    dayFiveTemp.innerHTML = `${chosenFiveTemp} F`;

                    var chosenFiveWind = data.daily[5].wind_speed;
                    dayFiveWind.innerHTML = `${chosenFiveWind} mph`;

                    var chosenFiveHumidity = data.daily[5].humidity;
                    dayFiveHumidity.innerHTML = `${chosenFiveHumidity} %`
                });

        })
};


