import data from "./data"; // Make sure data.tsx exports `default data`
import Header from "./components/Header";
import "./App.css";
import { useState } from "react";
import "bootswatch/dist/slate/bootstrap.min.css";

function UserGeneralInfo({ record }: { record: any }) {
  return (
    <ul className="list-group text-sm list-sm" style={{ textAlign: "left" }}>
      <li className="list-group-item">Name: {record.userName}</li>
      <li className="list-group-item">DOB: {record.userDob}</li>
      <li className="list-group-item">Height: {record.meta.height}</li>
    </ul>
  );
}
function RecordDiagnosis({ record }: { record: any }) {
  return (
    <ul className="list-group text-sm list-sm" style={{ textAlign: "left" }}>
      <li className="list-group-item">ID: {record.diagnosis.id}</li>
      <li className="list-group-item">Name: {record.diagnosis.name}</li>
      <li className="list-group-item">Severity: {record.diagnosis.severity}</li>
    </ul>
  );
}
function UserVitals({ record }: { record: any }) {
  return (
    <ul className="list-group" style={{ textAlign: "left" }} >
      {Object.keys(record.vitals).map((key: string) => (
        <li className="list-group-item">{key}: {record.vitals[key]}</li>
      ))}
    </ul>
  )
}
function RecordInfo({ record }: { record: any }) {
  return (
    <ul className="list-group" style={{ textAlign: "left" }} >
      <li className="list-group-item">
        <i className="fa-solid fa-calendar-days me-2"></i>
        Record ID: {record.id}
      </li>
      <li className="list-group-item">
        <i className="fa-solid fa-calendar-days me-2"></i>
        Record Date: {new Date(record.timestamp).toLocaleDateString()}
      </li>
      <li className="list-group-item">
        <i className="fa-solid fa-user-doctor me-2"></i>
        Doctor: {record.doctor.name}
      </li>
      <li className="list-group-item">
        <i className="fa-solid fa-weight-scale me-2"></i>
        Weight: {record.meta.weight}
      </li>
    </ul>
  )
}
function App() {
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>(0);
  const [ selectedRecordIndex, setSelectedRecordIndex] = useState<number>(0);
  const userIds = data.map((d: any) => d.id)
  const userData = data.filter((d: any) => d.id === userIds[selectedUserIndex])[0]
  // console.log(...userData.data)

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
  const selectedRecord = data.filter((d: any) => d.id === userIds[selectedUserIndex])[0].data[
    selectedRecordIndex
  ];
  console.log(selectedRecord)
  return (
    <>
      <Header />
      <div className="container-sm text-center" style={{ maxWidth: "400px" }}>
        <h4 className="no-margin display-none">
          User Index: {selectedUserIndex}
        </h4>
        <h4 className="no-margin display-none">
          User ID: {userIds[selectedUserIndex]}
        </h4>

        <div className="btn-group">
          <button
            className="btn btn-primary"
            key="prevUser"
            data-increment={-1}
            onClick={handleUserClick}
          >
            Prev Patient
          </button>
          <button
            className="btn btn-primary"
            key="nextUser"
            data-increment={1}
            onClick={handleUserClick}
          >
            Next Patient
          </button>
        </div>
        <div className="row align-items-center mt-2">
          <div className="col-4">
            <img
              className="img-thumbnail"
              src={"./images/" + userIds[selectedUserIndex] + ".jpg"}
              alt={"User" + userIds[selectedUserIndex]}
            />
          </div>
          <div className="col-8">
            <UserGeneralInfo record={userData.data[0]} />
          </div>
        </div>
        <div className="btn-group my-2">
          <button
            className="btn btn-outline-info"
            key="prevRecord"
            data-increment={-1}
            onClick={handleRecordClick}
          >
            Prev Record
          </button>
          <button
            className="btn btn-outline-info"
            key="nextRecord"
            data-increment={1}
            onClick={handleRecordClick}
          >
            Next Record
          </button>
        </div>
        <div className="row"> 
          <div className="col-6">
            <h4 className="text-info text-left">
              <i className="fa-solid fa-info-circle"></i>
              Record Info:
            </h4>
            <RecordInfo record={selectedRecord} />
            <h4 className="no-margin display-none">
              Record Index: {selectedRecordIndex}
            </h4>
            <h4 className="no-margin display-none">
              Record Id:{selectedRecord.id}
            </h4>
            <h4 className="text-info no-margin text-left">
              <i className="fa-solid fa-diagnoses"></i>Diagnosis:
            </h4>
            <RecordDiagnosis record={selectedRecord} />
          </div>
          <div className="col-6">
            <h4 className="text-info no-margin text-left">
              <i className="fa-solid fa-heart-pulse"></i>Vitals:
            </h4>
            <UserVitals record={selectedRecord} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
