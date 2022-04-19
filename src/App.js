import "./App.css";
import Articles from "./components/Articles";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import SingleTopic from "./components/SingleTopic";

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
      </Routes>
    </div>
  );
}

export default App;
