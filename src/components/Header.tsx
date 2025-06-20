import reactLogo from "../assets/react.svg";
export default function Header() {
  return (
    <h2 style={{ textAlign: "center", marginBottom: "2px" }}>
      <a
        href="https://github.com/attila5287/hackerrank-react-medical-records"
        target="_blank"
      >
        <img src={reactLogo} className="logo" alt="React logo" />
        Patient Medical Records
      </a>
    </h2>
  );
}
