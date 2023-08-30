// https://api.themoviedb.org/3/movie/11?api_key=59581cdd3cc3c21ba67a05e9a408688a
// https://api.themoviedb.org/3/movie/{movie_id}

// 'https://api.themoviedb.org/3/find/650?external_source=imdb_id'
// https://api.themoviedb.org/3/find/{external_id}

const apiKey = "59581cdd3cc3c21ba67a05e9a408688a";
const apiBaseURL ="https://api.themoviedb.org/3";
const imageBaseURL = "https://image.tmdb.org/t/p/w300" // here w300 --> width of image , p--> preview
// const a= 'https://api.themoviedb.org/3/search/movie?query=batman&include_adult=false&language=en-US&page=1'


const movieGrid = document.getElementById("movies-grid");
const searchInput = document.getElementById("text-input");
const searchForm = document.getElementById("search-form");  
const categoryTitle = document.getElementById("category-title");

const movieCard = document.getElementsByClassName("movie-card");

async function fetchMoviesPlayingNow(){
    let res =  await fetch(`${apiBaseURL}/movie/now_playing?api_key=${apiKey}`);
   let jsonDataRes = await res.json();
   let movie = jsonDataRes.results;
//    console.log(movie); 
      // if(movie.poster_path) return;            
   displayMovies(movie);



}


async function searchMovies(query){
      let res =  await fetch(`${apiBaseURL}/search/movie?api_key=${apiKey}&query=${query}`);
     let jsonDataRes = await res.json();
     let movie = jsonDataRes.results;
     console.log(movie); 
     
       displayMovies(movie);
  
  }

function displayMovies(movies){
      movieGrid.innerHTML =  movies.map((movie)=> 
      ` <div class="movie-card">   
             
             <img src= "${imageBaseURL}${movie.poster_path}" />
             <p>⭐ ${movie.vote_average}</p>
             <h1>${movie.title}</h1>
                   
        </div>`
        ).join("")      
}


async function getImdbId(movieId){
      let res =  await fetch(`${apiBaseURL}/movie/${movieId}/external_ids?api_key=${apiKey}`);
      let jsonDataRes = await res.json();
      console.log(jsonDataRes);
     return jsonDataRes.imdb_id;


}

// getImdbId(11)
// searchMovies("superman");
// fetchMoviesPlayingNow();

function handleSearchFormSubmit(event){
      event.preventDefault(); 
      categoryTitle.innerHTML = "Search Results";
      const searchQuery = searchInput.value;
      console.log(searchQuery);
      searchMovies(searchQuery);
   


}

searchForm.addEventListener('submit', handleSearchFormSubmit);
fetchMoviesPlayingNow();


