function MovieCard({movie, addFn, remFn, isInWatchlist}){
  return (
    <div className="movie-card">
      {movie.Poster && movie.Poster !== "N/A" && (
        <img src={movie.Poster} alt={movie.Title} />
      )}
      <div className="movie-info">
        <h5>{movie.Title}</h5>
        <ul>
          {movie.Year && <li>Year: {movie.Year}</li>}
          {movie.Rated && <li>Rated: {movie.Rated}</li>}
          {movie.Genre && <li>Genre: {movie.Genre}</li>}
          {movie.Runtime && movie.Type === 'movie' && <li>Runtime: {movie.Runtime}</li>}
          {movie.totalSeasons && <li>Seasons: {movie.totalSeasons}</li>}
          {movie.imdbRating && <li>IMDB Rating: {movie.imdbRating}</li>}
        </ul>
        {isInWatchlist ? (<>
          <button className='rem-btn' id={`rem-${movie.imdbID}`}
          onClick={() => remFn(movie.imdbID)}>-</button>
          <label> Remove from watchlist</label></>) : (<>
          <button className='add-btn' id={`add-${movie.imdbID}`}
          onClick={() => addFn(movie.imdbID)}>+</button>
          <label> Add to watchlist</label></>)}
        
      </div>
    </div>
  )
}
export default MovieCard;