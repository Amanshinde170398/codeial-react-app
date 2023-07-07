import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signup } from "../api";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Signing, setSinging] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name || !password || !confirmPassword) {
      toast.error("Please enter email, name & password.", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password & Confirm password shoul match", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }
    setSinging(true);
    const resp = await signup(email, name, password, confirmPassword);
    if (resp.success) {
      toast.success("Successfully Registered", {
        duration: 3000,
        position: "top-center",
      });
      navigate("/login");
    } else {
      toast.error("something went wrong. please try after sometime.", {
        duration: 3000,
        position: "top-center",
      });
    }
    setSinging(false);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Sign Up</span>
      <div className={styles.field}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={Signing}>{Signing ? "Signing..." : "SignUp"}</button>
      </div>
    </form>
  );
};

export default SignUp;
