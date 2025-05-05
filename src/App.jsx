import { Routes, Route } from "react-router-dom"
import CategoryPage from "./components/CategoryPage/CategoryPage"
import EventPage from "./components/EventPage/eventPage"
import Layout from "./components/Layout"
import Dashboard from "./components/Dashboard/Dashboard"
import "./assets/styles/style.scss"
import SanityEventDetails from "./components/Dashboard/SanityEventDetails"
import Home from "./components/HomePage/Home"

function App() {
  return (
    <>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sanity-event/:id" element={<SanityEventDetails />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
      </Routes>
      </Layout>
    </>
  )
}
export default App
