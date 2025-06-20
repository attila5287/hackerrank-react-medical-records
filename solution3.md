# solution 3: only next prev buttons, no select dropdowns

```JS
import data from "./data"; // Make sure data.tsx exports `default data`
import Header from "./components/Header";
import "./App.css";
import { useState } from "react";

function App() {
  console.log(data)
  console.log(...data)
  function findUserName(data: any, id: number) {
    return data.find((user: any) => user.id === id.toString())?.data[0]?.userName;
  }
  const [selectedUserId, setSelectedUserId] = useState<number>(1);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const increment = parseInt(e.currentTarget.dataset.increment || "0");
    const newUserId = selectedUserId + increment;
    if (newUserId >= 1 && newUserId <= data.length) {
      setSelectedUserId(newUserId);
    }
  }
  return (
    <>
      <Header />
      <button key="prev"  data-increment={-1} onClick={handleClick}>Prev User</button>
      <button key="next" data-increment={1} onClick={handleClick}>Next User</button>
      <h1>{findUserName(data, selectedUserId)}</h1>
    </>
  );
}

export default App;

```