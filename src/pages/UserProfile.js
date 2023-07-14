import { useEffect, useState } from "react";
import styles from "../styles/settings.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../components";
import { getUserDetails } from "../api";
import toast from "react-hot-toast";
import { useAuth } from "../hooks";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  const userDetails = async (userId) => {
    const response = await getUserDetails(userId);
    if (response.success) {
      setUser(response.data.user);
    } else {
      toast.error(response.message, {
        duration: 1000,
        position: "top-center",
      });
      return navigate("/");
    }
    setLoading(false);
  };

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friendships;
    const index = friends.map((friend) => friend.to_user._id);
    return index.includes(userId);
  };

  useEffect(() => {
    userDetails(userId);
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img alt="user dp" src={process.env.PUBLIC_URL + "/man.png"}></img>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
        ) : (
          <button className={`button ${styles.saveBtn}`}>Add Friend</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
