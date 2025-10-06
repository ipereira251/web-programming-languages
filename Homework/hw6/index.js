// iap200002
'use strict';


document.addEventListener("DOMContentLoaded", function () {
  const isHomepage = document.querySelector("movie-list");
  const isWatchlistPage = document.querySelector("watchlist-section");
  const page = document.body.id;
  if(page === "homepage") {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    searchInput.addEventListener("keypress", (event) => {
      if(event.key === "Enter"){
        event.preventDefault();
        document.getElementById("searchBtn").click();
      }    
    });
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim();
      fetch('http://www.omdbapi.com/?apikey=99816ac9&s=' + query)
      .then(res => res.json())
      .then(data => {
        if(data.Response === "True")
          displayMovieCards(data);
        else {
          console.error(data.Error);
          const messageBar = document.getElementById("message-bar");
          messageBar.textContent = null;
          const movieList = document.getElementById("movie-list");
          movieList.textContent = null;
          messageBar.innerHTML += "<h2>No titles found.</h2>";
        }
      })
      .catch(error => console.error(error));
    });
  } 
  if(page === "watchlist"){
    //get buttons to check
    
    //set up event listeners

    displayWatchlistCards();
  }
});

function getHTML(titleData, add){
  var ret = "<div class='movie-card'>";
  if(titleData.Poster === "N/A")
    ret += "<img src='' alt='" + titleData.Title + " poster'>";
  else 
    ret += "<img src='" + titleData.Poster + "' alt='" 
            + titleData.Title + " poster'>";
  ret += "<div class='movie-info'><h5>" 
        + titleData.Title + "</h5><p>Year: " 
        + titleData.Year + "</p>" + "<p>Rated: " 
        + titleData.Rated + "</p><p>Genre: "
        + titleData.Genre + "</p>";
  if(titleData.Type === "movie")
    ret += "<p>Runtime: " + titleData.Runtime + "</p>";
  else if(titleData.Type === "series")
    ret += "<p>Seasons: " + titleData.totalSeasons + "</p>";
  ret += "<p>IMDB Rating: " + titleData.imdbRating + "</p>";
  if(add){
    ret += "<button class='add-btn' id='add-" + titleData.imdbID
          + "'>+</button> <label> Add to watchlist</label></div></div>";
  } else{
    ret += "<button class='rem-btn' id='rem-" + titleData.imdbID
          + "'>-</button> <label> Remove from watchlist</label></div></div>";
  }
  return ret;
}

//display movie cards
function displayMovieCards(data){
  const messageBar = document.getElementById("message-bar");
  messageBar.textContent = null;
  const movieList = document.getElementById("movie-list");
  movieList.textContent = null;
  for(let i = 0; i < data.Search.length; i++){
    fetch('http://www.omdbapi.com/?apikey=99816ac9&i=' + data.Search[i].imdbID)
    .then(res => res.json())
    .then(titleData => {
      if(titleData.Response === "True"){
        movieList.innerHTML += getHTML(titleData, true);
    } else
      console.error(titleData.Error);})
    .catch(error => console.error(error));
    connectAddButtons();
  }
}
function connectAddButtons(){
  var imdbID = null;
  document.body.addEventListener("click", (event) => { //wait for a click
    //find all buttons with ids starting with 'add-'
    if(event.target.matches('button[id^="add-"]')) { 
      imdbID = event.target.id.substring(4); //get imdbID
    }
    if(imdbID){ 
      var titleHTML = "";
      fetch('http://www.omdbapi.com/?apikey=99816ac9&i=' + imdbID)
      .then(res => res.json())
      .then(titleData => { 
        if(titleData.Response === "True"){
          titleHTML = getHTML(titleData, false);
            if(titleHTML !== null){ //TODO: ensure no duplicates!!
              let flag = false;
              for(let i = 0; i < localStorage.length; i++){                
                if(localStorage.key(i) === "movie-card-" + imdbID){
                  flag = true;
                  console.log(localStorage.key(i) + ": " + titleData.Title + " already in watchlist.");
                  alert(titleData.Title + " is already in your watchlist!"); 
                } 
              } 
              if(!flag){
                localStorage.setItem("movie-card-" + imdbID, titleHTML);
                console.log(titleData.Title + " added to watchlist.");
                alert(titleData.Title + " successfully added to your watchlist.");
              }
            }
        } else { console.error(titleData.Error);}})
      .catch(error => console.error(error));
    }
  });
}
function displayWatchlistCards(){
  const cards = document.getElementById("watchlist-cards");
  if(cards){
    cards.innerHTML = null;
    const items = { ...localStorage };
    for(let [key, value] of Object.entries(items)){
      cards.innerHTML += value;
    }
  }
  connectRemoveButtons();
}
function connectRemoveButtons(){
  var imdbID = null;
  document.body.addEventListener("click", (event) => {
    if(event.target.matches('button[id^="rem-"]')){
      imdbID = event.target.id.substring(4);
    }
    if(imdbID){ 
      var titleHTML = "";
      fetch('http://www.omdbapi.com/?apikey=99816ac9&i=' + imdbID)
      .then(res => res.json())
      .then(titleData => { 
        if(titleData.Response === "True"){
          localStorage.removeItem("movie-card-" + titleData.imdbID);
          window.location.reload();
        } else { console.error(titleData.Error);}})
      .catch(error => console.error(error));
    }
  })
}