import "../styles/App.css";
import { Home, Login, SignUp } from "../pages";
import { Loader, Navbar } from "./";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../hooks";

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
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
