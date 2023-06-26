import "../styles/App.css";
import { getPosts } from "../api";
import { useState, setState } from "react";

function App() {
  const fetchPost = async () => {
    let resp = await getPosts();
    console.log(resp);
  };

  useState(() => {
    fetchPost();
    console.log("ok");
  }, []);
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
