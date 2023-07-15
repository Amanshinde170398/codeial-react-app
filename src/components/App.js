import "../styles/App.css";
import { Home, Login, SignUp, Settings, UserProfile } from "../pages";
import { Loader, Navbar } from "./";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../hooks";
import { func } from "prop-types";

function FourNotFour() {
  return <h1>404</h1>;
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}

function App() {
  const auth = useAuth();
  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/sign-up" Component={SignUp} />
        <Route
          exact
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/user/:userId"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route path="*" Component={FourNotFour} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
