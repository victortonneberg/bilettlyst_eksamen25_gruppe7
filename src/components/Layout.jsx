import { Link } from "react-router-dom"
import Header from "./Global_C/Header"
import Footer from "./Global_C/Footer"
import "../assets/styles/style.scss"

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
