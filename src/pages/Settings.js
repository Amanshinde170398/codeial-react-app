import { useAuth } from "../hooks";
import styles from "../styles/settings.module.css";
import { useState } from "react";
import toast from "react-hot-toast";

const Settings = () => {
  const auth = useAuth();
  const [editProfile, setEditProfile] = useState(false);
  const [name, setName] = useState(auth.user ? auth.user.name : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingForm, setSavingForm] = useState(false);

  const clearForm = () => {
    setName("");
    setPassword("");
    setConfirmPassword("");
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setSavingForm(true);
    let error = false;
    if (!name || !password || !confirmPassword) {
      toast.error("Please add email, password & confirm password");
      error = true;
    }
    if (confirmPassword != password) {
      toast.error("password and confirm password should match");
      error = true;
    }
    if (error) {
      return setSavingForm(false);
    }

    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );
    console.log(response, "no ok");

    if (response.success) {
      toast.success("User updated successfully", {
        duration: 1000,
        position: "top-center",
      });
      clearForm();
      setEditProfile(false);
    } else {
      toast.error(response.message || "something went wrong", {
        duration: 1000,
        position: "top-center",
      });
    }
    setSavingForm(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img alt="user dp" src={process.env.PUBLIC_URL + "/man.png"}></img>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editProfile ? (
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editProfile && (
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      )}

      {editProfile && (
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Confirm password</div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
      )}

      <div className={styles.btnGrp}>
        {editProfile ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? "Saviing..." : "Save"}
            </button>
            <button className={`button ${styles.goBack}`}>Go Back</button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => {
              setEditProfile(true);
            }}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};
export default Settings;
