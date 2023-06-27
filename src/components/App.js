import "../styles/App.css";
import { getPosts } from "../api";
import { useState, setState } from "react";
import { Home } from "../pages";

function App() {
  const fetchPost = async () => {
    let resp = await getPosts();
    console.log(resp);
  };

  useState(() => {
    fetchPost();
  }, []);
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
