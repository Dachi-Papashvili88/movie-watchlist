const main = document.getElementById("main")
const searchBtn = document.getElementById("search")
const searchTitle = document.getElementById("movie-search")
const searchMovies = document.getElementById("search-movies")
const myWatchlist = document.getElementById("watchlist")
const mainDiv = document.getElementById("main")



searchBtn.addEventListener("click", ()=> { 
    fetch("https://www.omdbapi.com/?s=&apikey=51f90224")
    .then(res=>res.json())
    .then(data=>{
        renderMovie()
        mainDiv.classList.remove("hidden")

})

})

function renderMovie(){  
  fetch(`https://www.omdbapi.com/?t=${searchTitle.value}&apikey=51f90224`)
  .then(res=>res.json())
  .then(data=>{
    console.log(data)
     main.innerHTML = `
   <div class="poster"><img class="poster" src="${data.Poster}"></div>
   <div class="tiitle"><h3>${data.Title}</h3></div>
   <div class="rating"<h4>${data.imdbRating}</h4></div>
   <div class="duration"><h4>${data.Runtime}</h4></div>
   <div class="genre"><h4>${data.Genre}</h4></div>
   <div class="add"><h4>Add to watchlist</h4></div>
   <div class="plot"<p>${data.Plot}</p></div>
   `
})
}


function watchlist(){
    
}


    searchMovies.addEventListener("click", function(){
        myWatchlist.classList.remove("hidden")
        searchMovies.classList.add("hidden")
        document.getElementById("container").classList.remove("hidden")

        

})

    myWatchlist.addEventListener("click", function(){
        searchMovies.classList.remove("hidden")
        myWatchlist.classList.add("hidden")

})


