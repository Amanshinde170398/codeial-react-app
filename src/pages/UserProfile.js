import { useEffect, useState } from "react";
import styles from "../styles/settings.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../components";
import { getUserDetails, createFriendship, removeFriendship } from "../api";
import toast from "react-hot-toast";
import { useAuth } from "../hooks";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  console.log(auth);

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

  const addFriend = async () => {
    setRequesting(true);
    const response = await createFriendship(userId);
    if (response.success) {
      auth.updateUserFriendShip(true, response.data.friendship);
      toast.success("Friend added successfuly", {
        duration: 1000,
        position: "top-center",
      });
    } else {
      toast.error(response.message, {
        duration: 1000,
        position: "top-center",
      });
    }
    setRequesting(false);
  };

  const removeFriend = async () => {
    setRequesting(true);
    const response = await removeFriendship(userId);
    if (response.success) {
      toast.success("Friend remove sucessfuly", {
        duration: 1000,
        position: "top-center",
      });
      auth.updateUserFriendShip(false, userId);
    } else {
      toast.error(response.message, { duration: 1000, position: "top-center" });
    }
    setRequesting(false);
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
          <button className={`button ${styles.saveBtn}`} onClick={removeFriend}>
            {requesting ? "Requesting..." : "Remove Friend"}
          </button>
        ) : (
          <button className={`button ${styles.saveBtn}`} onClick={addFriend}>
            {requesting ? "Requesting..." : "Add Friend"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
