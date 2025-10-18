import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

function WatchlistPage(){
  
  const [watchlist, setWatchlist] = useState([]); //contains IDs
  const [movies, setMovies] = useState([]); //contains movie data
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(list);
  }, []);

  useEffect(() => {
  const movieDetails = async () => {
    setIsLoading(true);
    const fetched = await Promise.all(
      watchlist.map(async (imdbID) => {
        const response = await fetch(`http://www.omdbapi.com/?apikey=99816ac9&i=${imdbID}`);
        const data = await response.json();
        if (data.Response === "True") {
          return data;
        }
        return null;
      })
    );
    //check to make sure these are real/valid
    const validMovies = fetched.map(movie => movie ? movie : null).filter(movie => movie !== null);
    setMovies(validMovies);
    setIsLoading(false);
  };

  if (watchlist.length > 0) {
    movieDetails();
  }
}, [watchlist]);

  function handleRemoveClick(imdbID){
    console.log("Clicked Remove for: ", imdbID);
    const updated = watchlist.filter(id => id !== imdbID);
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  }
  return(
  <main>
    <h2>Watchlist</h2>
    <section id="message-bar"> 
      {movies.length === 0 && <h2>No movies in your watchlist.</h2>}
    </section>
    <section id="watchlist-cards">
      {movies.length > 0 && (movies.map(movie => (
        <MovieCard key={movie.imdbID} 
        movie={movie}
        remFn={handleRemoveClick}
        isInWatchlist={true}
        />
        ))
      )}
    </section>
  </main>
  );
}
export default WatchlistPage;