import { useState } from 'react'

import './App.css'
import { Routes, Route } from 'react-router-dom'
import CategoryPage from './components/CategoryPage'
import Layout from './components/Layout'

function App() {

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
