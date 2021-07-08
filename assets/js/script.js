var searchBar = document.getElementById('searchBar');
var searchBtn = document.getElementById('searchBtn');
// var searchedCity = searchBar.value;
// var requestUrl = 'api.openweathermap.org/data/2.5/weather?q=Austin&appid=37e98eb8e58cfe49e4e0561295e9fd4d';
// var requestUrl = 'api.openweathermap.org/data/2.5/weather?q={city name}&appid=37e98eb8e58cfe49e4e0561295e9fd4d';

// }


searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    var searchedCity = searchBar.value;
    apiRequest(searchedCity);
})


function apiRequest (searchedCity) {
var completeURL = `'https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=37e98eb8e58cfe49e4e0561295e9fd4d'`;
fetch(completeURL)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    
})};





// function getApi() {
    
    
    
    // searchBtn.addEventListener("click", function(e){
        // e.preventDefault();
        // getApi();
        // });
    
    
    