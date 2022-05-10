import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import { auth } from "./firebase";

function App() {
  const userIsLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="App">
      {!userIsLoggedIn && <LoginPage />}
      {userIsLoggedIn && <MainPage />}
    </div>
  );
}

export default App;
