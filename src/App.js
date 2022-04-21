import "./App.css";
import Articles from "./components/Articles";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import SingleTopic from "./components/SingleTopic";
import SingleArticle from "./components/SingleArticle";
import NotFound from "./components/NotFound";
import { useState } from "react";
import { UserContext } from "./contexts/User";
import Login from "./components/Login";

function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);
  const toggleTheme = () => {
    setTheme((currTheme) => {
      return currTheme === "light" ? "dark" : "light";
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className={`App__${theme}`}>
        <header className="App-header">
          <h1 className="title">Nc - news</h1>
        </header>
        {user ? (
          <p>Currently logged in as {user}</p>
        ) : (
          <p>You're not logged in !</p>
        )}
        <button onClick={toggleTheme} className={`button__${theme}`}>
          {theme}mode
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
