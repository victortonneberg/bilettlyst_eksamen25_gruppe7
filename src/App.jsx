
import './App.css'
import { Routes, Route } from 'react-router-dom'
import CategoryPage from './components/CategoryPage/CategoryPage'
import DetailEventPage from './components/EventPage/DetailEventPage'
import Layout from './components/Layout'
import '../src/assets/styles/CategoryPage/CategoryPage.scss'
import Dashboard from "./components/Dashboard/Dashboard"
import "./assets/styles/style.scss"
import SanityEventDetails from "./components/Dashboard/SanityEventDetails"
import Home from "./components/HomePage/Home"


function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sanity-event/:id" element={<SanityEventDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/category/:slug/:id" element={<CategoryPage />} />
          <Route path="/events/:id" element={<DetailEventPage />} />
        </Routes>
      </Layout>
    </>
  )
}
export default App
