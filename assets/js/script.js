//Global Variables

let searchBar = document.getElementById('searchBar');
let searchBtn = document.getElementById('searchBtn');
let cityContainer = document.querySelector('.one');

cityName = document.getElementById('city-name')
currentTemp = document.getElementById('temp')
currentWind = document.getElementById('wind')
currentHumidity = document.getElementById('humidity')
currentUVIndex = document.getElementById('uv-index')

let dateOne = document.getElementById('day-one-date');
let dateTwo = document.getElementById('day-two-date');
let dateThree = document.getElementById('day-three-date');
let dateFour = document.getElementById('day-four-date');
let dateFive = document.getElementById('day-five-date');

let symbolOne = document.getElementById('day-one-symbol')
let symbolTwo = document.getElementById('day-two-symbol')
let symbolThree = document.getElementById('day-three-symbol')
let symbolFour = document.getElementById('day-four-symbol')
let symbolFive = document.getElementById('day-five-symbol')

let tempOne = document.getElementById('day-one-temp');
let tempTwo = document.getElementById('day-two-temp');
let tempThree = document.getElementById('day-three-temp');
let tempFour = document.getElementById('day-four-temp');
let tempFive = document.getElementById('day-five-temp');

let windOne = document.getElementById('day-one-wind');
let windTwo = document.getElementById('day-two-wind');
let windThree = document.getElementById('day-three-wind');
let windFour = document.getElementById('day-four-wind');
let windFive = document.getElementById('day-five-wind');

let humidityOne = document.getElementById('day-one-humidity');
let humidityTwo = document.getElementById('day-two-humidity');
let humidityThree = document.getElementById('day-three-humidity');
let humidityFour = document.getElementById('day-four-humidity');
let humidityFive = document.getElementById('day-five-humidity');



let searchHistoryPlaceholder = document.getElementById('search-history');
let historyCities = JSON.parse(localStorage.getItem("Search-History")) || [];





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
    let searchedCityHistory = searchBar.value;
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
    let searchedCity = searchBar.value;
    renderButton();
    apiWeatherData(searchedCity);
})


function apiWeatherData(searchedCity) {
    let completeURLCurrentWeatherData = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=37e98eb8e58cfe49e4e0561295e9fd4d`;
    console.log(completeURLCurrentWeatherData);
    fetch(completeURLCurrentWeatherData)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);


            //City Name, Current Time, and Weather Icon
            let chosenCity = data.name;
            let rawChosenCityDate = data.dt;
            let trueChosenCityDate = rawChosenCityDate * 1000;
            let finalChosenCityDate = new Date(trueChosenCityDate).toLocaleDateString("en-US");
            let weatherIconID = data.weather[0].icon;
            let weatherIconURL = `http://openweathermap.org/img/wn/${weatherIconID}@2x.png`;



            cityName.innerHTML = `${chosenCity} --- ${finalChosenCityDate} --- <img src=${weatherIconURL}>`;

            //Current City Time
            currentTemp.innerHTML = `Temp: ${data.main.temp} F`;

            //Current Wind Speed
            currentWind.innerHTML = `Wind: ${data.wind.speed} MPH`;

            //Current Humidity
            currentHumidity.innerHTML = `Humidity: ${data.main.humidity} %`;

            // historyCities.unshift(chosenCity);
            localStorage.setItem("Search History", searchedCity);










            // let lat = data.coord.lat;
            // let lon = data.coord.lon;



            let completeURLFiveDayForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current,minutely,hourly,alerts&units=imperial&appid=37e98eb8e58cfe49e4e0561295e9fd4d`;
            console.log(completeURLFiveDayForecast);
            fetch(completeURLFiveDayForecast)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);

                    //Current Day UVI (CANNOT BE OBTAINED THROUGH CURRENT DAY API)
                    let chosenCityUVIndex = data.daily[0].uvi;
                    currentUVIndex.innerHTML = `UV Index: ${chosenCityUVIndex}`;


                 
                    weatherForecast(data, 1, dateOne, symbolOne, tempOne, windOne, humidityOne);
                    weatherForecast(data, 2, dateTwo, symbolTwo, tempTwo, windTwo, humidityTwo);
                    weatherForecast(data, 3, dateThree, symbolThree, tempThree, windThree, humidityThree);
                    weatherForecast(data, 4, dateFour, symbolFour, tempFour, windFour, humidityFour);
                    weatherForecast(data, 5, dateFive, symbolFive, tempFive, windFive, humidityFive);
                });

        })
};



init();

function weatherForecast(data, digit, date, symbol, temp, wind, humidity) {
    date.innerHTML = `${new Date((data.daily[digit].dt * 1000)).toLocaleDateString("en-US")}`;

    symbol.innerHTML = `<img src=http://openweathermap.org/img/wn/${data.daily[digit].weather[0].icon}@2x.png>`;

    temp.innerHTML = `${data.daily[digit].temp.day} F`;

    wind.innerHTML = `${data.daily[digit].wind_speed} mph`;

    humidity.innerHTML = `${data.daily[digit].humidity} %`;
}
