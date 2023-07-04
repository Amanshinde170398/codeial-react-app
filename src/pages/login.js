import styles from "../styles/login.module.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { login } from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log(true);
      toast.error("Please enter both email and password.", {
        duration: 1000,
        position: "top-center",
      });
      return;
    }
    setLoggingIn(true);
    const response = login(email, password);
    if (response.success) {
      console.log("ok");
    } else {
      toast.error("Invalid email/password", {
        duration: 4000,
        position: "top-center",
      });
    }
    setLoggingIn(false);
  };
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}></span>
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
        <button disabled={loggingIn}>
          {loggingIn ? "Loging..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default Login;
