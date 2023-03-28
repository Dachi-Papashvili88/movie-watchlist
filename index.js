const main = document.getElementById("main")
const searchBtn = document.getElementById("search")
const searchTitle = document.getElementById("movie-search")
const searchMovies = document.getElementById("search-movies")
const myWatchlist = document.getElementById("watchlist")
const mainDiv = document.getElementById("main")
const addToWatchlist = document.getElementById("add")
const removeSelectedMovie = document.getElementById("remove")
const container =  document.getElementById("container")
const selectedMovies = document.getElementById("selected")


searchBtn.addEventListener("click", (e)=> { 
        e.preventDefault();
        renderMovies()
        mainDiv.classList.remove("hidden")
})


function renderMovies() {
  fetch(`https://www.omdbapi.com/?s=${searchTitle.value}&apikey=51f90224`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
     data.Search.forEach(data => {
         const movieName = (data.Title).split(' ').join('+')
              fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=51f90224`)
                  .then(res => res.json())
                  .then(data => {
                      main.innerHTML += `
              <div class="first-div">
              <img class="poster" src="${data.Poster}">
              <div class="second-div">
              <div class="title">
              <h3 class="movie-title">${data.Title}</h3>
              <h4 class="rating">⭐${data.imdbRating}</h4>
              </div> 
              <div class="length">
              <h4 class="duration">${data.Runtime}</h4>
              <h4 class="genre">${data.Genre}</h4>
              <h4 class="add" id="add" onclick="watchList(event)"><i class="fa-solid fa-circle-plus"></i>Watchlist</h4>
              </div>
              <p class="plot">${data.Plot}</p>
              </div>
              </div>
            `;
          });
       });
       
    });
          
          
    searchTitle.value = "";                              
    main.innerHTML = "";
  
}


 let movieArray = []


    searchMovies.addEventListener("click", () =>{
        myWatchlist.classList.remove("hidden")
        searchMovies.classList.add("hidden")
        container.classList.remove("hidden")
        
})

   myWatchlist.addEventListener("click", () =>{
        myWatchlist.classList.remove("hidden")
        searchMovies.classList.remove("hidden")
        main.classList.add("hidden")
        selectedMovies.classList.remove("hidden")
        searchMovies.classList.add("hidden")
})


  
function watchList(event) {
  
  const firstDiv = event.target.closest('.first-div');

  const movieTitle = firstDiv.getElementsByClassName('movie-title')[0].textContent;
  const movieRating = firstDiv.getElementsByClassName('rating')[0].textContent;
  const movieRuntime = firstDiv.getElementsByClassName('duration')[0].textContent;
  const movieGenre = firstDiv.getElementsByClassName('genre')[0].textContent;
  const moviePlot = firstDiv.getElementsByClassName('plot')[0].textContent;
  const moviePoster = firstDiv.getElementsByClassName('poster')[0].src;


  let movie = { title: movieTitle, rating: movieRating, runtime: movieRuntime, genre: movieGenre, plot: moviePlot, poster: moviePoster };


  console.log('movie', movie)

  movieArray.push(movie);
  localStorage.setItem('watchlist', JSON.stringify(movieArray));
  JSON.parse(localStorage.getItem('watchlist'));
       selectedMovies.innerHTML += `
     <div class="movie-div" id="movie-div">
    <img class="poster" src="${movie.poster}" >
    <div class="second-div">
    <div class="title">
    <h3 class="movie-title">${movie.title}</h3>
    <h4 class="rating">${movie.rating}</h4>
     </div>
     <div class="length">
    <h4 class="duration">${movie.runtime}</h4>
    <h4 class="genre">${movie.genre}</h4>
    <h4 class="remove" id="remove" onclick="removeMovie(event)"><i class="fa-solid fa-circle-minus"></i>Remove</h4>
    </div>
    <p class="plot">plot ${movie.plot}</p>
    </div>
  </div>
`;
    selectedMovies.classList.add("hidden")
  
  }
  
  
  // Delete selected movie in the watchlist
  function removeMovie(event) {
  const movieDiv = event.target.closest('.movie-div');
  const movieTitle = movieDiv.getElementsByClassName('movie-title')[0].textContent;

  // Find the index of the selected movie in the movieArray
  const index = movieArray.findIndex(movie => movie.title === movieTitle);
  if (index >= 0) {
    // Remove the selected movie from the movieArray
    movieArray.splice(index, 1);

    // Update the localStorage with the updated movieArray
    localStorage.setItem('watchlist', JSON.stringify(movieArray));

    // Remove the selected movie from the selectedMovies element
     movieDiv.remove();
  }
}
