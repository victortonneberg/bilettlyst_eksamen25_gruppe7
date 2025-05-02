

import './App.css'
import { Routes, Route } from 'react-router-dom'
import CategoryPage from './components/CategoryPage'
import EventPage from './components/eventPage.jsx'
import Layout from './components/Layout'


function App() {

  return (
    
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<EventPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </Layout>
    </>

  )
}
export default App

