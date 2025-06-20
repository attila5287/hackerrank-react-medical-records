import data from "./data"; // Make sure data.tsx exports `default data`
import Header from "./components/Header";
import "./App.css";
import { useState } from "react";
import "bootswatch/dist/slate/bootstrap.min.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function VitalsChart({ userData }: { userData: any }) {
  const [selectedVital, setSelectedVital] = useState<string>('weight');
  
  if (!userData || !userData.data) return null;

  const vitalOptions = [
    { key: 'weight', label: 'Weight', color: 'rgb(75, 192, 192)', unit: 'kg' },
    { key: 'bloodPressureSystole', label: 'Blood Pressure (Systolic)', color: 'rgb(255, 99, 132)', unit: 'mmHg' },
    { key: 'bloodPressureDiastole', label: 'Blood Pressure (Diastolic)', color: 'rgb(54, 162, 235)', unit: 'mmHg' },
    { key: 'pulse', label: 'Pulse', color: 'rgb(255, 205, 86)', unit: 'bpm' },
    { key: 'breathingRate', label: 'Breathing Rate', color: 'rgb(153, 102, 255)', unit: 'breaths/min' },
    { key: 'bodyTemperature', label: 'Body Temperature', color: 'rgb(255, 159, 64)', unit: '°F' },
  ];

  const getVitalData = (vitalKey: string) => {
    if (vitalKey === 'weight') {
      return userData.data.map((record: any) => record.meta.weight).reverse();
    } else {
      return userData.data.map((record: any) => record.vitals[vitalKey]).reverse();
    }
  };

  const selectedVitalOption = vitalOptions.find(option => option.key === selectedVital);

  const chartData = {
    labels: userData.data.map((record: any) => 
      new Date(record.timestamp).toLocaleDateString()
    ).reverse(),
    datasets: [
      {
        label: selectedVitalOption?.label || 'Vital',
        data: getVitalData(selectedVital),
        borderColor: selectedVitalOption?.color || 'rgb(75, 192, 192)',
        backgroundColor: selectedVitalOption?.color ? selectedVitalOption.color.replace('rgb', 'rgba').replace(')', ', 0.5)') : 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${selectedVitalOption?.label} Progress - ${userData.data[0]?.userName}`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: selectedVitalOption?.unit || 'Value',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <div className="mt-4">
      <div className="btn-group my-0" role="group">
        {vitalOptions.map((option) => (
          <button
            key={option.key}
            type="button"
            className={`btn btn-sm text-sm ${selectedVital === option.key ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setSelectedVital(option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <Line options={options} data={chartData} />
    </div>
  );
}

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
    <ul className="list-group my-2 mx-2" style={{ textAlign: "left" }}>
      {Object.keys(record.vitals).map((key: string) => (
        <li className="list-group-item py-3">
          <span className="text-reg">{key}:</span>
          <span className="text-reg">{record.vitals[key]}</span>
        </li>
      ))}
    </ul>
  );
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
        {record.doctor.name}
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
      <div className="container-sm text-center" style={{ maxWidth: "600px" }}>
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
        <VitalsChart userData={userData} />
        <div className="btn-group my-2">
          <button
            className="btn btn-outline-info border-info border-1"
            key="prevRecord"
            data-increment={-1}
            onClick={handleRecordClick}
          >
            <i className="fa-solid fa-chevron-left mx-2"></i>
            Prev Record
          </button>
          <button
            className="btn btn-outline-info border-info border-1"
            key="nextRecord"
            data-increment={1}
            onClick={handleRecordClick}
          >
            Next Record
            <i className="fa-solid fa-chevron-right mx-2"></i>
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
