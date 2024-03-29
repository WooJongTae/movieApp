import { Routes, Route } from "react-router-dom";

import "./App.css";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./components/LoginPage/LoginPage";
import Auth from "./hoc/Auth";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import FavoritePage from "./components/FavoritePage/FavoritePage";

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" element={Auth(LoadingPage, null)} />
        <Route path="/register" element={Auth(RegisterPage, false)} />
        <Route path="/login" element={Auth(LoginPage, false)} />
        <Route path="/movie/:movieId" element={Auth(MovieDetail, true)} />
        <Route path="/favorite" element={Auth(FavoritePage, true)} />
      </Route>
    </Routes>
  );
}

export default App;
