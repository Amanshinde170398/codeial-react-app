import { useState, useContext, useEffect } from "react";
import { PostContext } from "../providers";
import { getPosts } from "../api";

export const usePost = () => {
  return useContext(PostContext);
};

export const useProvidePost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    let resp = await getPosts();
    if (resp.success) {
      setPosts(resp.data.posts);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const addPostToState = (post) => {
    setPosts([post, ...posts]);
  };

  const addCommentToState = (postId, comment) => {
    const newPosts = posts.map((post) => {
      if (post._id == postId) {
        return { ...post, comments: [comment, ...post.comments] };
      }
      return post;
    });
    setPosts(newPosts);
  };

  return {
    data: posts,
    loading,
    addPostToState,
    addCommentToState,
  };
};
