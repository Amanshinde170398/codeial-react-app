import styles from "../styles/home.module.css";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";

const FriendList = () => {
  const auth = useAuth();
  const { friendships = [] } = auth.user;
  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>
      {friendships && friendships.length === 0 && (
        <div className={styles.noFriends}>No Friends found!</div>
      )}
      {friendships &&
        friendships.map((friend) => (
          <div key={`friend-${friend._id}`}>
            <Link
              to={`/user/${friend.to_user._id}`}
              className={styles.friendsItem}
            >
              <div className={styles.friendsImg}>
                <img
                  alt="user dp"
                  src={process.env.PUBLIC_URL + "/man.png"}
                ></img>
              </div>
              <div className={styles.friendsName}>{friend.to_user.name}</div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FriendList;
