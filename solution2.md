# solution 2: add table

```JS
import data from "./data"; // Make sure data.tsx exports `default data`
import Header from "./components/Header";
import "./App.css";
import { useState } from "react";

function App() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  return (
    <>
      <Header />
      {/* select next user */}
      <button
        className="width-50"
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
        Next User
      </button>

      <select
        className="width-50"
        style={{ padding: "0.5rem" }}
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
      <h2 className="no-margin no-padding">
        {data.find((user) => user.id === selectedUserId)?.data[0].userName}
      </h2>
      <p className="no-margin no-padding">
        weight:{" "}
        {data.find((user) => user.id === selectedUserId)?.data[0].meta.weight}
        <br />
        height:{" "}
        {data.find((user) => user.id === selectedUserId)?.data[0].meta.height}
        <br />
        DOB: {data.find((user) => user.id === selectedUserId)?.data[0].userDob}
      </p>

      <table style={{ width: "100%", border: "1px solid grey" }}>
        <thead>
          <tr>
            <th>Vital</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(
            data.find((user) => user.id === selectedUserId)?.data[0].vitals ||
              {}
          ).map((vital, index) => (
            <tr key={index}>
              <td>{vital}</td>
              <td>
                {
                  (
                    data.find((user) => user.id === selectedUserId)?.data[0]
                      .vitals as any
                  )[vital]
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;

```