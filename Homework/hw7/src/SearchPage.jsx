import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
function SearchPage(){
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [status, setStatus] = useState('typing');
  const [error, setError] = useState(null);

  useEffect(() => {
      const list = JSON.parse(localStorage.getItem('watchlist')) || [];
      setWatchlist(list);
    }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const fetchResults = () => {
    setStatus('submitting');
    setError(null);
    fetch(`http://www.omdbapi.com/?apikey=99816ac9&s=${query}`)
    .then(res => res.json())
    .then(data => {
      if(data.Response === "True"){
        const fullDetails = data.Search.map((movie) => 
          fetch(`http://www.omdbapi.com/?apikey=99816ac9&i=${movie.imdbID}`)
          .then((res) => res.json()));
        console.log(data);
        setResults(data.Search);
        setStatus('success');
        return Promise.all(fullDetails);
        
      } else {
        setResults([]);
        setStatus('no-results');
        return [];
      }
    })
    .then((detailedResults) => {
      if(detailedResults.length > 0){
        setResults(detailedResults);
        setStatus('success');
      }
    })
    .catch(err => {
      console.error(err);
      setError(err);
      setStatus('error');
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //no refresh
    if(query.trim())
        fetchResults();
  };

  const handleKeyDown = (e) => {
    if(e.key === "Enter")
      handleSubmit(e);
  }

  /* Adds the imdbID to local storage, watchlist conatains all IDs */
  function handleAddClick(imdbID) {
    console.log("Clicked Add for:", imdbID);
    //add to local storage
    const list = [...watchlist];
    const isDuplicate = list.some(id => id === imdbID);
    if(!isDuplicate){
      list.push(imdbID);
      localStorage.setItem('watchlist', JSON.stringify(list));
      console.log(imdbID + " added to watchlist.");

      setWatchlist(list);
    } else {
      alert("This movie is already in your watchlist");
    }
  }

  function handleRemClick(imdbID){
    console.log("Clicked Remove for:", imdbID);
    const list = watchlist.filter(id => id !== imdbID);
    localStorage.setItem('watchlist', JSON.stringify(list));

    setWatchlist(list);
  }

  function isInWatchlist(movie){
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    return watchlist.some(id => id === movie.imdbID);
  }

  return(
  <main>
    <section className="search">
      <form onSubmit={handleSubmit}>
        <input type="text" id="search-input" placeholder="Enter movie title..." 
          value={query} onChange={handleInputChange} onKeyDown={handleKeyDown} 
          disabled={status === 'submitting'} />
        <button id="search-btn" disabled={status === 'submitting'}>Search</button>
      </form>
    </section>
    <section id="message-bar">
      {status === 'typing' && <h2>Welcome, please enter a title above to get started.</h2>}
      {status === 'no-results' && <h2>Couldn't find anything by that name, try again.</h2>}
      {status === 'error' && <h2>whoops</h2>}
    </section>
    
    <section className="movie-list" id="movie-list">
      {results.map(movie => (
        <MovieCard key={movie.imdbID}
        movie={movie}
        addFn={handleAddClick}
        remFn={handleRemClick}
        isInWatchlist={isInWatchlist(movie)
        }
        />
      ))}
    </section>
  </main>
  );
}
export default SearchPage;