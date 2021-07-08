var searchBar = document.getElementById('searchBar');
var searchBtn = document.getElementById('searchBtn');
// var searchedCity = searchBar.value;


cityName = document.getElementById('city-name')
currentTemp = document.getElementById('temp')
currentWind = document.getElementById('wind')
currentHumidity = document.getElementById('humidity')
currentUVIndex = document.getElementById('uv-index')


searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    var searchedCity = searchBar.value;
    console.log(searchedCity);
    apiCurrentWeatherData(searchedCity);
    // apiFiveDayForecast(searchedCity);
})


function apiCurrentWeatherData (searchedCity) {
var completeURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=37e98eb8e58cfe49e4e0561295e9fd4d`;
console.log(completeURL);
fetch(completeURL)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
  
    var chosenCity = data.name;
    cityName.append(chosenCity);

    var chosenCityTemp = data.main.temp;
    currentTemp.append(chosenCityTemp);

    var chosenCityWind = data.wind.speed;
    currentWind.append(chosenCityWind);

    var chosenCityHumidity = data.main.humidity;
    currentHumidity.append(`Humidy: ${chosenCityHumidity} %`);


    
})};
    

// function apiFiveDayForecast (searchedCity) {
//     var completeURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=37e98eb8e58cfe49e4e0561295e9fd4d`;
//     console.log(completeURL);
//     fetch(completeURL)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//         for (i = 0; i < data.list.length; i++) {
//         if (data.list[i].dt_txt)
//             console.log(data.list[i].dt_txt)
//         }
        
//     })};