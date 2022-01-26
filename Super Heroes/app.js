const movieDiv = document.getElementById("movieDiv")
const searchButton = document.getElementById("searchButton")
const searchTextBox = document.getElementById("searchTextBox")
const apikey = '252c9978'

searchButton.onclick = () => getSearchResults()

function getSearchResults(){
    let superHero = searchTextBox.value
    let request = new XMLHttpRequest()
    request.open('GET', `http://www.omdbapi.com/?s=${superHero}&apikey=${apikey}`)
    request.send()    
    request.onload = () => displaySearchResults(request.responseText)    
}

function displaySearchResults(results){
    let movies = JSON.parse(results)
    let html = movies.Search.map(result => 
        `<div class="search">
        <img src=${result.Poster} class="poster"/>
        <h5>${result.Title} (${result.Year})</h5>
        <button id="moreInfoButton" onclick="getImdbInfo('${result.imdbID}')">More Info</button>
        <div id="${result.imdbID}InfoDiv"></div>
        </div>`).join('')
    movieDiv.innerHTML = html
}

function getImdbInfo(id) {
    let request = new XMLHttpRequest()
    request.open('GET', `http://www.omdbapi.com/?i=${id}&apikey=${apikey}`)
    request.send()
    request.onload = () => displayImdbInfo(request.responseText)    
}

function displayImdbInfo(results){
    let imdb = JSON.parse(results)
    let info = 
        `<h5>Metascore: ${imdb.Metascore}</h5>
        <h5>imdb Rating: ${imdb.imdbRating}</h5>
        <h5>MPAA Rating: ${imdb.Rated}</h5>
        <h5>Runtime: ${imdb.Runtime}</h5>` 
    document.getElementById(`${imdb.imdbID}InfoDiv`).innerHTML = info    
}