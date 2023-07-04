import "../styles/App.css";
import { getPosts } from "../api";
import { useState, useEffect } from "react";
import { Home, Login } from "../pages";
import { Loader, Navbar } from "./";
import { Routes, Route } from "react-router-dom";

const AboutUs = () => {
  return <h1>About us</h1>;
};

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
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home posts={posts} />} />
        <Route exact path="/login" Component={Login} />
      </Routes>
    </div>
  );
}

export default App;
