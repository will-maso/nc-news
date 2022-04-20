import "./App.css";
import Articles from "./components/Articles";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import SingleTopic from "./components/SingleTopic";
import SingleArticle from "./components/SingleArticle";
import Comments from "./components/Comments";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Nc - news</h1>
      </header>
      <Nav />
      <Routes>
        <Route path="/" element={<Articles />}></Route>
        <Route path="/:topic_slug" element={<SingleTopic />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/articles/:article_id/comments" element={<Comments />} />
      </Routes>
    </div>
  );
}

export default App;
