import "../styles/App.css";
import { getPosts } from "../api";
import { useState, useEffect } from "react";
import { Home } from "../pages";
import { Loader } from "./";

function App() {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    let resp = await getPosts();
    if (resp.success) {
      setPost(resp.data.posts);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Home posts={posts} />
    </div>
  );
}

export default App;
