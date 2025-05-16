import { Link } from "react-router-dom";
import "../../assets/styles/Global_C/Header.scss";

export default function Header() {
  return (
    <header className="globalheader">
      <Link to="/" className="logo">
        BilettLyst
      </Link>
      <nav className="global-nav">
        <ul className="nav-center">
          <li>
            <Link to="/category/musikk">Musikk</Link>
          </li>
          <li>
            <Link to="/category/sport">Sport</Link>
          </li>
          <li>
            <Link to="/category/teater">Teater/Show</Link>
          </li>
        </ul>
        <ul className="header-min-side">
          <li>
            <Link to="/dashboard">Logg inn</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
