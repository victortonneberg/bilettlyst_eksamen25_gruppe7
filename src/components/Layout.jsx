import { Link } from "react-router-dom"

export default function Layout({ children }) {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Hjem</Link>
          </li>
          <li>
            <Link to="/category/musikk">Musikk</Link>
          </li>
          <li>
            <Link to="/category/sport">Sport</Link>
          </li>
          <li>
            <Link to="/category/teater">Teater</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </>
  )
}
