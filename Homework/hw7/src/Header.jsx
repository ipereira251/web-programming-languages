import { Link, useLocation } from "react-router-dom";
function Header(){ //props to only show other page?

  const location = useLocation();

  return(
  <header className="app-header">
    <h1>Movie Search</h1>
    <nav>
      {(location.pathname === "/") ? 
      (<Link to="/watchlist">Watchlist</Link>) : (<Link to="/">Search</Link>)}
    </nav>
    
  </header>
  );
}
export default Header;