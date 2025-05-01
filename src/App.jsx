import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import CategoryPage from './components/CategoryPage'
import Layout from './components/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <Routes>
          <Route path=":slug" element={<CategoryPage />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
