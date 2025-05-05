import "../../assets/styles/Global_C/Footer.scss"
export default function Footer() {
  return (
    <footer className="globalfooter">
      <p>
        Data hentet fra{" "}
        <a href="https://developer.ticketmaster.com/products-and-docs/apis/getting-started/">
          Ticketmaster API
        </a>
      </p>
    </footer>
  )
}
