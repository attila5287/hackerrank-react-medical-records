import reactLogo from "../assets/react.svg";

export default function Header() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark justify-content-center mt-0 pt-0 mb-4">
      <a
        className="navbar-brand"
        href="https://github.com/attila5287/hackerrank-react-medical-records"
        target="_blank"
      >
        <img src={reactLogo} className="logo" alt="React logo" />
      </a>
      <a
        className="nav-link"
        href="https://github.com/attila5287/hackerrank-react-medical-records"
        target="_blank"
      >
        Patient Medical Records
      </a>
      <a
        className="nav-link"
        href="https://github.com/attila5287/hackerrank-react-medical-records"
        target="_blank"
      >
        <i className="fa-brands fa-github"></i>
      </a>
      <a
        className="nav-link"
        href="https://www.hackerrank.com/challenges/patient-medical-records/"
        target="_blank"
      >
        <i className="fa-brands fa-hackerrank"></i>
      </a>
      <a
        className="nav-link"
        href="https://randomuser.me/api/?results=20"
        target="_blank"
      >
        <i className="fa-solid fa-circle-user"></i>
      </a>
      <a
        className="nav-link"
        href="https://hackerrank-react-medical-records.vercel.app/"
        target="_blank"
      >
        <i className="fa-solid fa-globe"></i>
      </a>
    </nav>
  );
}
