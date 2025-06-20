import data from "./data"; // Make sure data.tsx exports `default data`
import Header from "./components/Header";
import "./App.css";

function App() {
  console.log(data);
  return (
    <>
      <Header />

      <ul>
        {data.map((group) => (
          <li key={group.id}>{group.id}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
