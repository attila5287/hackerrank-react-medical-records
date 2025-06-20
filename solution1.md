# solution 1

## solution 1: step 1 dropdown menu and next button
```JS
import data from "./data"; // Make sure data.tsx exports `default data`
import Header from "./components/Header";
import "./App.css";
import { useState } from "react";

function App() {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  return (
    <>
      <Header />
      {/* select next user */}
      <button
        onClick={() => {
          const currentIndex = data.findIndex(
            (user) => user.id === selectedUserId
          );
          console.log("currentIndex ", currentIndex);
          const nextUser = data[currentIndex + 1];
          console.log("nextUser ", nextUser?.data[0].userName);
          setSelectedUserId(nextUser?.id || null);
        }}
      >
        Select Next User
      </button>

      <select
        onChange={(e) => {
          const selectedUser = e.target.value;
          setSelectedUserId(selectedUser || null);
        }}
      >
        <option value="">Select a user</option>
        {data.map((user) => (
          <option key={user.id} value={user.id}>
            {user.id}: {user.data[0].userName}
          </option>
        ))}
      </select>
      <h4>
        {data.find((user) => user.id === selectedUserId)?.data[0].userName}
      </h4>
      <p>
        weight: {data.find((user) => user.id === selectedUserId)?.data[0].meta.weight}
        <br />
        height: {data.find((user) => user.id === selectedUserId)?.data[0].meta.height}
        <br />
        DOB: {data.find((user) => user.id === selectedUserId)?.data[0].userDob}
      </p>
    </>
  );
}

export default App;


```