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
            let chosenCityTemp = data.main.temp;
            currentTemp.innerHTML = `Temp: ${chosenCityTemp} F`;

            //Current Wind Speed
            let chosenCityWind = data.wind.speed;
            currentWind.innerHTML = `Wind: ${chosenCityWind} MPH`;

            //Current Humidity
            let chosenCityHumidity = data.main.humidity;
            currentHumidity.innerHTML = `Humidy: ${chosenCityHumidity} %`;

            // historyCities.unshift(chosenCity);
            localStorage.setItem("Search History", searchedCity);


            let lat = data.coord.lat;
            let lon = data.coord.lon;

            let completeURLFiveDayForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=imperial&appid=37e98eb8e58cfe49e4e0561295e9fd4d`;
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


                    //Day 1 Forecast
                    let finalChosenOneDate = new Date((data.daily[1].dt * 1000)).toLocaleDateString("en-US");
                    dateOne.innerHTML = `${finalChosenOneDate}`;

                    let chosenOneIcon = data.daily[1].weather[0].icon;
                    let chosenOneIconURL = `http://openweathermap.org/img/wn/${chosenOneIcon}@2x.png`;
                    symbolOne.innerHTML = `<img src=${chosenOneIconURL}>`
                    console.log(chosenOneIconURL);

                    let chosenOneTemp = data.daily[1].temp.day;
                    tempOne.innerHTML = `${chosenOneTemp} F`;

                    let chosenOneWind = data.daily[1].wind_speed;
                    windOne.innerHTML = `${chosenOneWind} mph`;

                    let chosenOneHumidity = data.daily[1].humidity;
                    humidityOne.innerHTML = `${chosenOneHumidity} %`


                    //Day 2 Forecast
                    let finalChosenTwoDate = new Date((data.daily[2].dt * 1000)).toLocaleDateString("en-US");
                    dateTwo.innerHTML = `${finalChosenTwoDate}`;

                    let chosenTwoIcon = data.daily[2].weather[0].icon;
                    let chosenTwoIconURL = `http://openweathermap.org/img/wn/${chosenTwoIcon}@2x.png`;
                    symbolTwo.innerHTML = `<img src=${chosenTwoIconURL}>`
                    console.log(chosenOneIconURL);

                    let chosenTwoTemp = data.daily[2].temp.day;
                    tempTwo.innerHTML = `${chosenTwoTemp} F`;

                    let chosenTwoWind = data.daily[2].wind_speed;
                    windTwo.innerHTML = `${chosenTwoWind} mph`;

                    let chosenTwoHumidity = data.daily[2].humidity;
                    humidityTwo.innerHTML = `${chosenTwoHumidity} %`


                    //Day 3 Forecast
                    let finalChosenThreeDate = new Date((data.daily[3].dt * 1000)).toLocaleDateString("en-US");
                    dateThree.innerHTML = `${finalChosenThreeDate}`;

                    let chosenThreeIcon = data.daily[3].weather[0].icon;
                    let chosenThreeIconURL = `http://openweathermap.org/img/wn/${chosenThreeIcon}@2x.png`;
                    symbolThree.innerHTML = `<img src=${chosenThreeIconURL}>`
                    console.log(chosenOneIconURL);

                    let chosenThreeTemp = data.daily[3].temp.day;
                    tempThree.innerHTML = `${chosenThreeTemp} F`;

                    let chosenThreeWind = data.daily[3].wind_speed;
                    windThree.innerHTML = `${chosenThreeWind} mph`;

                    let chosenThreeHumidity = data.daily[3].humidity;
                    humidityThree.innerHTML = `${chosenThreeHumidity} %`


                    //Day 4 Forecast
                   
                    let finalChosenFourDate = new Date((data.daily[4].dt * 1000)).toLocaleDateString("en-US");
                    dateFour.innerHTML = `${finalChosenFourDate}`;

                    let chosenFourIcon = data.daily[4].weather[0].icon;
                    let chosenFourIconURL = `http://openweathermap.org/img/wn/${chosenFourIcon}@2x.png`;
                    symbolFour.innerHTML = `<img src=${chosenFourIconURL}>`
                    console.log(chosenOneIconURL);

                    let chosenFourTemp = data.daily[4].temp.day;
                    tempFour.innerHTML = `${chosenFourTemp} F`;

                    let chosenFourWind = data.daily[4].wind_speed;
                    windFour.innerHTML = `${chosenFourWind} mph`;

                    let chosenFourHumidity = data.daily[4].humidity;
                    humidityFour.innerHTML = `${chosenFourHumidity} %`


                    //Day 5 Forecast
                    dateFive.innerHTML = `${new Date((data.daily[5].dt * 1000)).toLocaleDateString("en-US")}`;

                    symbolFive.innerHTML = `<img src=http://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png>`

                    tempFive.innerHTML = `${data.daily[5].temp.day} F`;

                    windFive.innerHTML = `${data.daily[5].wind_speed} mph`;

                    humidityFive.innerHTML = `${data.daily[5].humidity} %`;
                });

        })
};



init();