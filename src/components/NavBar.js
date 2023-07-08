import { useAuth } from "../hooks";
import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const auth = useAuth();
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          ></img>
        </Link>
      </div>
      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <a href="/">
              <img
                alt="user dp"
                src={process.env.PUBLIC_URL + "/man.png"}
                className={styles.userDp}
              ></img>
            </a>
            <span>{auth.user.name}</span>
          </div>
        )}
      </div>
      <div className={styles.navLinks}>
        <ul>
          {auth.user ? (
            <li>
              <button onClick={auth.logout}>Log Out</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/sign-up">Register?</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
