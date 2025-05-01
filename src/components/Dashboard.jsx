import { useState } from "react"
import "../assets/styles/Dashboard/Dashboard.scss"

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }

  return (
    <>
      {!isLoggedIn ? (
        <section id="loginform">
          <h1>Dashboard</h1>
          <form onSubmit={handleSubmit}>
            <h2>Logg inn</h2>
            <label>
              Brukernavn
              <input type="text" name="username" placeholder="victorto" />
            </label>
            <input
              type="submit"
              value="Logg inn"
              className="submitbutton"
            ></input>
          </form>
        </section>
      ) : (
        <h1>Min side</h1>
      )}
    </>
  )
}
