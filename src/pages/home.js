// import PropTypes from "prop-types";
import styles from "../styles/home.module.css";
import { Loader, FriendList, CreatePost } from "../components";
import { useAuth, usePost } from "../hooks";

import { Post } from "../components";

const Home = () => {
  const auth = useAuth();
  const posts = usePost();

  if (posts.loading) {
    return <Loader />;
  }
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        {auth.user && <CreatePost />}
        {posts.data.map((post) => (
          <Post key={`post-${post._id}`} post={post} />
        ))}
      </div>
      {auth.user && <FriendList />}
    </div>
  );
};
export default Home;
