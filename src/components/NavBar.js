import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
const Navbar = () => {
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
        <div className={styles.user}>
          <a href="/">
            <img
              alt="user dp"
              src={process.env.PUBLIC_URL + "/man.png"}
              className={styles.userDp}
            ></img>
          </a>
          <span>Aman</span>
        </div>
      </div>
      <div className={styles.navLinks}>
        <ul>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <a href="/">Log Out</a>
          </li>
          <li>
            <a href="/">Register?</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
