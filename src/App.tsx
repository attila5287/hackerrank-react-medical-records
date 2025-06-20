import data from "./data"; // Make sure data.tsx exports `default data`
import Header from "./components/Header";
import "./App.css";
import { useState } from "react";

function App() {
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>(0);
  const [ selectedRecordIndex, setSelectedRecordIndex] = useState<number>(0);
  const userIds = data.map((d: any) => d.id)
  console.log(data.filter((d: any) => d.id === userIds[selectedUserIndex])[0].data[selectedRecordIndex])

  const handleUserClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const increment = parseInt(e.currentTarget.dataset.increment || "0");
    const newUserIndex = selectedUserIndex + increment;
    if (newUserIndex >= 0 && newUserIndex < userIds.length) {
      setSelectedUserIndex(newUserIndex)
    }
  };
  const handleRecordClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const increment = parseInt(e.currentTarget.dataset.increment || "0");
    const newRecordIndex = selectedRecordIndex + increment;
    if (newRecordIndex >= 0 && newRecordIndex < data.filter((d: any) => d.id === userIds[selectedUserIndex])[0].data.length) {
      setSelectedRecordIndex(newRecordIndex)
    }
  };
  return (
    <>
      <Header />
      <button
        key="prevUser"
        data-increment={-1}
        onClick={handleUserClick}
      >
        Prev Patient
      </button>
      <button key="nextUser"
        data-increment={1}
        onClick={handleUserClick}
      >
          Next Patient
      </button>
      <h4 className="no-margin">User Index: {selectedUserIndex}</h4>
      <h4 className="no-margin">User ID: {userIds[selectedUserIndex]}</h4>
      <button key="prevRecord"
        data-increment={-1}
        onClick={handleRecordClick}
      >
        Prev Record
      </button>
      <button key="nextRecord"
        data-increment={1}
        onClick={handleRecordClick}
      >
        Next Record
      </button>
      <h4 className="no-margin">Record Index: {selectedRecordIndex}</h4>
      <h4 className="no-margin">Record Id: {data.filter((d: any) => d.id === userIds[selectedUserIndex])[0].data[selectedRecordIndex].id}</h4>
    </>
  );
}

export default App;
