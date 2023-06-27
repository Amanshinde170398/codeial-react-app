import styles from "../styles/navbar.module.css";
const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <a href="/">
          <img alt="" src=""></img>
        </a>
      </div>
      <div className={styles.rightNav}>
        <div className={styles.user}>
          <a href="/">
            <img alt="" src="" className={styles.userDp}></img>
          </a>
          <span>Aman</span>
        </div>
      </div>
      <div className={styles.navLinks}>
        <ul>
          <li>
            <a href="/">Log In</a>
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
