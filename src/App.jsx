// import "./App.css"
import { Routes, Route } from "react-router-dom"
import CategoryPage from "./components/CategoryPage/CategoryPage"
import EventPage from "./components/EventPage/eventPage"
import Layout from "./components/Layout"
import Dashboard from "./components/Dashboard/Dashboard"

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<EventPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </Layout>
    </>
  )
}
export default App
