import "./App.css";
import Articles from "./components/Articles";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import SingleTopic from "./components/SingleTopic";
import SingleArticle from "./components/SingleArticle";
import NotFound from "./components/NotFound";
import { useEffect, useState } from "react";
import { UserContext } from "./contexts/User";
import Login from "./components/Login";
import { Link } from "react-router-dom";

function App() {
  const darkModeFromStorage = localStorage.getItem("theme");
  const initialDarkMode = darkModeFromStorage === "true";
  const [darkmode, setDarkmode] = useState(initialDarkMode);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const toggleTheme = () => {
    localStorage.setItem("theme", !darkmode);
    setDarkmode((currDarkmode) => {
      return !currDarkmode;
    });
  };
  useEffect(() => {
    localStorage.setItem("theme", String(darkmode));
  }, [darkmode]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className={`App__${darkmode ? "light" : "dark"}`} id="App">
        <header className="App-header">
          <Link to="/" className="Link" id="Header">
            <h1 className="title">NorthCoders - news</h1>
          </Link>
        </header>
        {user ? (
          <p>Currently logged in as {user}</p>
        ) : (
          <p>You're not logged in !</p>
        )}
        <button
          onClick={() => toggleTheme()}
          className={`button__${darkmode ? "dark" : "light"}`}
        >
          {darkmode ? "dark" : "light"}mode
        </button>
        <Nav />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Articles />}></Route>
          <Route path="/:topic_slug" element={<SingleTopic />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
