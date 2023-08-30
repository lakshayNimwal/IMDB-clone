

const api_key = "16f6c78";
const url = " http://www.omdbapi.com/?apikey=";

var searchInput = document.getElementById("search-input");
const favButton = document.getElementById("fav-button");



const singleMovie = async ()=>{
  // find id from url
  let urlQueryParameters = new URLSearchParams(window.location.search);
  let id = urlQueryParameters.get("id");
  // console.log(id)
  const fetchUrl = `http://www.omdbapi.com/?i=${id}&apikey=${api_key}`;
  const res = await fetch(fetchUrl);
  const data = await res.json();
  // console.log(data);
  var output = `

  <div class="movie-poster">
      <img src=${data.Poster} alt="Movie Poster">
  </div>
  <div class="movie-details">
      <div class="details-header">
          <div class="dh-ls">
              <h2>${data.Title}</h2>
          </div>
          <div class="dh-rs">
              <i class="fa-solid fa-bookmark" onClick=addTofavorites('${id}') style="cursor: pointer;"></i>
          </div>
      </div>
      <span class="italics-text"><i>${data.Year} &#x2022; ${data.Country} &#x2022; Rating - <span
                  style="font-size: 18px; font-weight: 600;">${data.imdbRating}</span>/10 </i></span>
      <ul class="details-ul">
          <li><strong>Actors: </strong>${data.Actors}</li>
          <li><strong>Director: </strong>${data.Director}</li>
          <li><strong>Writers: </strong>${data.Writer}</li>
      </ul>
      <ul class="details-ul">
          <li><strong>Genre: </strong>${data.Genre}</li>
          <li><strong>Release Date: </strong>${data.DVD}</li>
          <li><strong>Box Office: </strong>${data.BoxOffice}</li>
          <li><strong>Movie Runtime: </strong>${data.Runtime}</li>
      </ul>
      <p style="font-size: 14px; margin-top:10px;">${data.Plot}</p>
      <p style="font-size: 15px; font-style: italic; color: #222; margin-top: 10px;">
          <i class="fa-solid fa-award"></i>
          &thinsp; ${data.Awards}
      </p>
  </div> 
  `
  document.querySelector(".movie-content").innerHTML = output;




}



 async function favrouietMoviePage(){
  // window.location.assign("favorite.html"); 
  const favContainer = document.getElementById("fav-container");
  var favOutput = '';
    // get the key stored in local storage
    for(var i=0; i<localStorage.length; i++){
      
      let key = localStorage.key(i);
      // console.log(key);
      const fetchUrl = `http://www.omdbapi.com/?i=${key}&apikey=${api_key}`;
      const res = await fetch(fetchUrl);
      const movie = await res.json();
      // console.log(movie);
      var imgUrl = "";
      if (movie.Poster != "N/A") {
        imgUrl = movie.Poster;
      } else {
        imgUrl = "./assets/blankPoster.jpg"
      }
  

      favOutput += `<div class="card ">
                  <div class="card-poster">
                  <a href="movie.html?id=${key}" >  <img src= "${imgUrl}"  alt="Movie Poster"/></a>
                 
                  </div>
               <h1>Title: ${movie.Title}</h1>
               <div class="flex card-info">
            <p>Year: ${movie.Year}</p>
         <button  onClick="removeFav('${key}')"> remove </button>
            
            </div>

            </div>`

            
    }
      favContainer.innerHTML = favOutput;
   
}

function removeFav(id){
  // console.log(id)
  localStorage.removeItem(id);
  alert("Removed from Favorite");
  window.location.reload();
}

async function fetchMovies(query) {
  const res = await fetch(`${url}${api_key}&s=${query}`);
  const movies = await res.json();
  //  displayMovie(movies);
}

function addTofavrouitMovie(id, title){
  console.log("id:" + id);
  localStorage.setItem(id, title);
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
                  <a href="movie.html?id=${id}" ><img src= "${imgUrl}"  alt="Movie Poster"/></a>
                  </div>
                  <a href="movie.html?id=${id}" ><h5>Title: ${i.Title}</h5></a>
               <div class="flex card-info">
               <a href="movie.html?id=${id}" ><p>Year: ${i.Year}</p></a>
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
