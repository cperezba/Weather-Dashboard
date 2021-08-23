//Global Variables

var searchBar = document.getElementById('searchBar');
var searchBtn = document.getElementById('searchBtn');
var cityContainer = document.querySelector('.one');

cityName = document.getElementById('city-name')
currentTemp = document.getElementById('temp')
currentWind = document.getElementById('wind')
currentHumidity = document.getElementById('humidity')
currentUVIndex = document.getElementById('uv-index')

var dayOneDate = document.getElementById('day-one-date');
var dayTwoDate = document.getElementById('day-two-date');
var dayThreeDate = document.getElementById('day-three-date');
var dayFourDate = document.getElementById('day-four-date');
var dayFiveDate = document.getElementById('day-five-date');

var dayOneSymbol = document.getElementById('day-one-symbol')
var dayTwoSymbol = document.getElementById('day-two-symbol')
var dayThreeSymbol = document.getElementById('day-three-symbol')
var dayFourSymbol = document.getElementById('day-four-symbol')
var dayFiveSymbol = document.getElementById('day-five-symbol')

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



var searchHistoryPlaceholder = document.getElementById('search-history');


var historyCities = JSON.parse(localStorage.getItem("Search-History")) || [];


function init() {
    historyCities.forEach(city => {
        let element = document.createElement("button");
        element.setAttribute('class', 'btn btn-secondary w-100');
        element.style.marginTop = "10px";
        element.value = city
        element.addEventListener("click", function (event) {
            apiWeatherData(event.target.value);
        });
        element.textContent = city;
        searchHistoryPlaceholder.appendChild(element);
    });
};






function renderButton() {
    if (!searchBar.value) {
        return;
    } else {
    var searchedCityHistory = searchBar.value;
    console.log(searchedCityHistory);
    let element = document.createElement("button");
    element.setAttribute('class', 'btn btn-secondary w-100');
    element.style.marginTop = "10px";
    element.value = searchBar.value;
    element.addEventListener("click", function (event) {
        apiWeatherData(event.target.value);
    });
    element.textContent = searchedCityHistory;
    searchHistoryPlaceholder.appendChild(element);
    if (historyCities.length >= 5) {
        historyCities.shift();
        historyCities.push(searchBar.value);
        searchHistoryPlaceholder.textContent = '';
        init();
    } else {
        historyCities.push(searchBar.value);
    }
    localStorage.setItem("Search-History", JSON.stringify(historyCities));
};
};







searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var searchedCity = searchBar.value;

    // for (i = 0; i <= historyCities.length; i++) {
    //     var searchedCityHistory = searchBar.value;
    //     console.log(searchedCityHistory);
    //     let element = document.createElement("button");
    //     element.setAttribute('class', 'btn btn-secondary w-100');
    //     element.style.marginTop = "10px";
    //     element.textContent = searchedCityHistory;
    //     searchHistoryPlaceholder.appendChild(element);
    // }
    renderButton();



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


            //City Name, Current Time, and Weather Icon
            var chosenCity = data.name;
            var rawChosenCityDate = data.dt;
            var trueChosenCityDate = rawChosenCityDate * 1000;
            var finalChosenCityDate = new Date(trueChosenCityDate).toLocaleDateString("en-US");
            var weatherIconID = data.weather[0].icon;
            var weatherIconURL = `http://openweathermap.org/img/wn/${weatherIconID}@2x.png`;



            cityName.innerHTML = `${chosenCity} --- ${finalChosenCityDate} --- <img src=${weatherIconURL}>`;

            //Current City Time
            var chosenCityTemp = data.main.temp;
            currentTemp.innerHTML = `Temp: ${chosenCityTemp} F`;

            //Current Wind Speed
            var chosenCityWind = data.wind.speed;
            currentWind.innerHTML = `Wind: ${chosenCityWind} MPH`;

            //Current Humidity
            var chosenCityHumidity = data.main.humidity;
            currentHumidity.innerHTML = `Humidy: ${chosenCityHumidity} %`;

            // historyCities.unshift(chosenCity);
            localStorage.setItem("Search History", searchedCity);


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
                    var rawChosenOneDate = data.daily[1].dt;
                    var trueChosenOneDate = rawChosenOneDate * 1000;
                    var finalChosenOneDate = new Date(trueChosenOneDate).toLocaleDateString("en-US");
                    dayOneDate.innerHTML = `${finalChosenOneDate}`;

                    var chosenOneIcon = data.daily[1].weather[0].icon;
                    var chosenOneIconURL = `http://openweathermap.org/img/wn/${chosenOneIcon}@2x.png`;
                    dayOneSymbol.innerHTML = `<img src=${chosenOneIconURL}>`
                    console.log(chosenOneIconURL);

                    var chosenOneTemp = data.daily[1].temp.day;
                    dayOneTemp.innerHTML = `${chosenOneTemp} F`;

                    var chosenOneWind = data.daily[1].wind_speed;
                    dayOneWind.innerHTML = `${chosenOneWind} mph`;

                    var chosenOneHumidity = data.daily[1].humidity;
                    dayOneHumidity.innerHTML = `${chosenOneHumidity} %`


                    //Day 2 Forecast
                    var rawChosenTwoDate = data.daily[2].dt;
                    var trueChosenTwoDate = rawChosenTwoDate * 1000;
                    var finalChosenTwoDate = new Date(trueChosenTwoDate).toLocaleDateString("en-US");
                    dayTwoDate.innerHTML = `${finalChosenTwoDate}`;

                    var chosenTwoIcon = data.daily[2].weather[0].icon;
                    var chosenTwoIconURL = `http://openweathermap.org/img/wn/${chosenTwoIcon}@2x.png`;
                    dayTwoSymbol.innerHTML = `<img src=${chosenTwoIconURL}>`
                    console.log(chosenOneIconURL);

                    var chosenTwoTemp = data.daily[2].temp.day;
                    dayTwoTemp.innerHTML = `${chosenTwoTemp} F`;

                    var chosenTwoWind = data.daily[2].wind_speed;
                    dayTwoWind.innerHTML = `${chosenTwoWind} mph`;

                    var chosenTwoHumidity = data.daily[2].humidity;
                    dayTwoHumidity.innerHTML = `${chosenTwoHumidity} %`


                    //Day 3 Forecast
                    var rawChosenThreeDate = data.daily[3].dt;
                    var trueChosenThreeDate = rawChosenThreeDate * 1000;
                    var finalChosenThreeDate = new Date(trueChosenThreeDate).toLocaleDateString("en-US");
                    dayThreeDate.innerHTML = `${finalChosenThreeDate}`;

                    var chosenThreeIcon = data.daily[3].weather[0].icon;
                    var chosenThreeIconURL = `http://openweathermap.org/img/wn/${chosenThreeIcon}@2x.png`;
                    dayThreeSymbol.innerHTML = `<img src=${chosenThreeIconURL}>`
                    console.log(chosenOneIconURL);

                    var chosenThreeTemp = data.daily[3].temp.day;
                    dayThreeTemp.innerHTML = `${chosenThreeTemp} F`;

                    var chosenThreeWind = data.daily[3].wind_speed;
                    dayThreeWind.innerHTML = `${chosenThreeWind} mph`;

                    var chosenThreeHumidity = data.daily[3].humidity;
                    dayThreeHumidity.innerHTML = `${chosenThreeHumidity} %`


                    //Day 4 Forecast
                    var rawChosenFourDate = data.daily[4].dt;
                    var trueChosenFourDate = rawChosenFourDate * 1000;
                    var finalChosenFourDate = new Date(trueChosenFourDate).toLocaleDateString("en-US");
                    dayFourDate.innerHTML = `${finalChosenFourDate}`;

                    var chosenFourIcon = data.daily[4].weather[0].icon;
                    var chosenFourIconURL = `http://openweathermap.org/img/wn/${chosenFourIcon}@2x.png`;
                    dayFourSymbol.innerHTML = `<img src=${chosenFourIconURL}>`
                    console.log(chosenOneIconURL);

                    var chosenFourTemp = data.daily[4].temp.day;
                    dayFourTemp.innerHTML = `${chosenFourTemp} F`;

                    var chosenFourWind = data.daily[4].wind_speed;
                    dayFourWind.innerHTML = `${chosenFourWind} mph`;

                    var chosenFourHumidity = data.daily[4].humidity;
                    dayFourHumidity.innerHTML = `${chosenFourHumidity} %`


                    //Day 5 Forecast
                    var rawChosenFiveDate = data.daily[5].dt;
                    var trueChosenFiveDate = rawChosenFiveDate * 1000;
                    var finalChosenFiveDate = new Date(trueChosenFiveDate).toLocaleDateString("en-US");
                    dayFiveDate.innerHTML = `${finalChosenFiveDate}`;

                    var chosenFiveIcon = data.daily[5].weather[0].icon;
                    var chosenFiveIconURL = `http://openweathermap.org/img/wn/${chosenFiveIcon}@2x.png`;
                    dayFiveSymbol.innerHTML = `<img src=${chosenFiveIconURL}>`
                    console.log(chosenFiveIconURL);

                    var chosenFiveTemp = data.daily[5].temp.day;
                    dayFiveTemp.innerHTML = `${chosenFiveTemp} F`;

                    var chosenFiveWind = data.daily[5].wind_speed;
                    dayFiveWind.innerHTML = `${chosenFiveWind} mph`;

                    var chosenFiveHumidity = data.daily[5].humidity;
                    dayFiveHumidity.innerHTML = `${chosenFiveHumidity} %`
                });

        })
};



init();