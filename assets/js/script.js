var searchBar = document.getElementById('searchBar');
var searchBtn = document.getElementById('searchBtn');
// var searchedCity = searchBar.value;


searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    var searchedCity = searchBar.value;
    console.log(searchedCity);
    apiRequest(searchedCity);
})


function apiRequest (searchedCity) {
var completeURL = "'https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=37e98eb8e58cfe49e4e0561295e9fd4d'";
console.log(completeURL);
fetch(completeURL)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    
})};
    
    
    