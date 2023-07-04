import styles from "../styles/login.module.css";

const Login = () => {
  return (
    <form className={styles.loginForm}>
      <span className={styles.loginSignupHeader}></span>
      <div className={styles.field}>
        <input type="email" value="" placeholder="Email" required />
      </div>
      <div className={styles.field}>
        <input type="password" value="" placeholder="Password" required />
      </div>
      <div className={styles.field}>
        <button>Login</button>
      </div>
    </form>
  );
};

export default Login;
