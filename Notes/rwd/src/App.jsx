import { useState, useEffect } from 'react'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  //js-side rwd also possible, render different content based on viewport
  const [posts, setPosts] = useState([]);
  const [isMobile, setToMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    fetch()
    .then()
    .then();
  });
  const visiblePosts = isMobile ? posts.slice(-3) : posts.slice(0, 3);

  return (
    <>
      <div className="container">
        Responsive Web Design
        <p className="px">Text, px</p>
        <p className="em">Text, em</p>
        <p className="rem">Text, rem</p>
        <p className="per">Text, %</p>
      </div>
    </>
  )
}

export default App
