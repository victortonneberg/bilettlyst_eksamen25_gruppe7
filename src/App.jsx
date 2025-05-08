import "./App.css";
import { Routes, Route } from "react-router-dom";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import Layout from "./components/Layout";
import "../src/assets/styles/CategoryPage/CategoryPage.scss";
import "./assets/styles/EventPage/EventPage.scss";
import Dashboard from "./components/Dashboard/Dashboard";
import "./assets/styles/style.scss";
import SanityEventDetails from "./components/Dashboard/SanityEventDetails";
import Home from "./components/HomePage/Home";
import EventPage from "./components/EventPage/EventPage";

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
          <Route path="/events/:id" element={<EventPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
