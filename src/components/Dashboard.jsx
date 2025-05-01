import "../assets/styles/Dashboard/Dashboard.scss"

export default function Dashboard() {
  return (
    <>
      <section id="loginform">
        <h1>Dashboard</h1>
        <form>
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
    </>
  )
}
