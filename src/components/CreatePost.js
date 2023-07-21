import { useState } from "react";
import styles from "../styles/home.module.css";
import { addPost } from "../api";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [post, setPost] = useState("");
  const [addingPost, setAddingPost] = useState(false);

  const handleAddPostClick = async () => {
    if (!post) {
      toast.error("Please add post first", {
        duration: 4000,
        position: "top-center",
      });
      return;
    }
    setAddingPost(true);
    const response = await addPost(post);
    if (response.success) {
      toast.success("Post added successfully", {
        duration: 4000,
        position: "top-center",
      });
      setPost("");
    } else {
      toast.error(response.message, { duration: 4000, position: "top-center" });
    }
    setAddingPost(false);
  };
  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        placeholder="Add Post"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <div>
        <button
          className={styles.addPostBtn}
          disabled={addingPost}
          onClick={handleAddPostClick}
        >
          {addingPost ? "Adding post..." : "Add Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
