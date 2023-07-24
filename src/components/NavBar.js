import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { searchUsers } from "../api";

const Navbar = () => {
  const auth = useAuth();
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    const response = await searchUsers(searchText);
    if (response.success) {
      setResults(response.data.users);
    }
  };

  useEffect(() => {
    if (searchText.length > 2) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [searchText]);

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
      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src={process.env.PUBLIC_URL + "search.png"}
          alt="search"
        />
        <input
          type="text"
          placeholder="Search users"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                  onClick={() => setResults([])}
                >
                  <Link to={`/user/${user._id}`}>
                    <img src={process.env.PUBLIC_URL + "/man.png"} />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                alt="user dp"
                src={process.env.PUBLIC_URL + "/man.png"}
                className={styles.userDp}
              ></img>
            </Link>
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
