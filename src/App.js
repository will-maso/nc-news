import "./App.css";
import Articles from "./components/Articles";
import Filter from "./components/Filter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Nc - news</h1>
      </header>
      <Filter />
      <Articles />
    </div>
  );
}

export default App;
