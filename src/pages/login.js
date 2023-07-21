import styles from "../styles/login.module.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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
    const response = await auth.login(email, password);
    if (response.success) {
      toast.success("Loged in successfuly", {
        duration: 4000,
        position: "top-center",
      });
      navigate("/");
    } else {
      toast.error("Invalid email/password", {
        duration: 4000,
        position: "top-center",
      });
    }
    setLoggingIn(false);
  };

  if (auth.user) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>LogIn</span>
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
