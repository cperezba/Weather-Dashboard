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
}
}



searchBtn.addEventListener("click", function (event) {
    event.preventDefault();

    renderButton();
    apiWeatherData(searchBar.value);
})


function apiWeatherData(searchedCity) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=37e98eb8e58cfe49e4e0561295e9fd4d`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            
            currentWeather(data, searchedCity);


            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current,minutely,hourly,alerts&units=imperial&appid=37e98eb8e58cfe49e4e0561295e9fd4d`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);

                    //Current Day UVI (CANNOT BE OBTAINED THROUGH CURRENT DAY API)
                    currentUVIndex.innerHTML = `UV Index: ${data.daily[0].uvi}`;


                 
                    weatherForecast(data, 1, dateOne, symbolOne, tempOne, windOne, humidityOne);
                    weatherForecast(data, 2, dateTwo, symbolTwo, tempTwo, windTwo, humidityTwo);
                    weatherForecast(data, 3, dateThree, symbolThree, tempThree, windThree, humidityThree);
                    weatherForecast(data, 4, dateFour, symbolFour, tempFour, windFour, humidityFour);
                    weatherForecast(data, 5, dateFive, symbolFive, tempFive, windFive, humidityFive);
                });

        })
};




function currentWeather(data, searchedCity) {
    cityName.innerHTML = `${data.name} --- ${new Date((data.dt * 1000)).toLocaleDateString("en-US")} --- <img src=http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png>`;
    currentTemp.textContent = `Temp: ${data.main.temp} F`;
    currentWind.textContent = `Wind: ${data.wind.speed} MPH`;
    currentHumidity.textContent = `Humidity: ${data.main.humidity} %`;
    
    localStorage.setItem("Search History", searchedCity);
}


function weatherForecast(data, digit, date, symbol, temp, wind, humidity) {
    date.textContent = `${new Date((data.daily[digit].dt * 1000)).toLocaleDateString("en-US")}`;
    symbol.innerHTML = `<img src=http://openweathermap.org/img/wn/${data.daily[digit].weather[0].icon}@2x.png>`;
    temp.textContent = `${data.daily[digit].temp.day} F`;
    wind.textContent = `${data.daily[digit].wind_speed} mph`;
    humidity.textContent = `${data.daily[digit].humidity} %`;
}

init();