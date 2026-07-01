import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </>
  )
}

export default App;