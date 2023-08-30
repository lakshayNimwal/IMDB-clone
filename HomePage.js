

const api_key = "16f6c78";
const url = " http://www.omdbapi.com/?apikey=";

var searchInput = document.getElementById("search-input");
const favButton = document.getElementById("fav-button");


// favButton.addEventListener("click", favrouitMoviePage());


async function favrouitMoviePage(){
  window.location.assign("favorite.html"); 
  // key is the title;
    for(let i=0; i<localStorage.length; i++){
      let key = localStorage.key(i); // title of movie
      const res = await fetch(`${url}${api_key}&s=${key}`);
    const movies = await res.json();
    console.log(movies.Search);
      
    }
}

async function fetchMovies(query) {
  const res = await fetch(`${url}${api_key}&s=${query}`);
  const movies = await res.json();
  //  displayMovie(movies);
}

function addTofavrouitMovie(id, title){
  console.log("id:" + id);
  localStorage.setItem(title, id);
  alert("Movie Added to favrouites");
  // document.getElementById("fav-icon").classList.add("fav-icon");
}

// fetchMovies('mario');
function displayMovie(movies) {
  const cardContainer = document.getElementById("cards-container");

  var output = "";
  for (var i of movies) {
    // console.log(i.Poster);
    // console.log(i.Title);
    // console.log(i.imdbID);
    var imgUrl = "";
    if (i.Poster != "N/A") {
      imgUrl = i.Poster;
    } else {
      imgUrl = "./assets/blankPoster.jpg"
    }

 
  var id = i.imdbID;

  output += `<div class="card ">
                  <div class="card-poster">
                  <img src= "${imgUrl}"  alt="Movie Poster"/>
                  </div>
               <h1>Title: ${i.Title}</h1>
               <div class="flex card-info">
            <p>Year: ${i.Year}</p>
            <i class="fa-regular fa-lg fa-star" id="fav-icon" onclick= "addTofavrouitMovie('${id}', '${i.Title}')"></i>
            </div>

            </div>`

            cardContainer.innerHTML = output;
}}




searchInput.addEventListener("input", searchMovie);

async function searchMovie() {
  const res = await fetch(`${url}${api_key}&s=${searchInput.value}`);
  const data = await res.json();
  
  displayMovie(data.Search);
 
}
