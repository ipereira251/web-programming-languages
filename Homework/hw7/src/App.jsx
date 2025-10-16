import './App.css'
import Header from './Header.jsx'
import SearchPage from './SearchPage.jsx'
import WatchlistPage from './WatchlistPage.jsx'

import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Routes>
    </>
  )
}

export default App
