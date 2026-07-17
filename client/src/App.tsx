import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkApiHealth } from "./api/health";
import ServerLoadingScreen from "./components/ServerLoadingScreen";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isApiReady, setIsApiReady] = useState(false);
  useEffect(() => {
      let isCancelled = false;
      let retryTimeout: ReturnType<typeof setTimeout>;

      const waitForApi = async () => {
          const isReady = await checkApiHealth();

          if (isCancelled) {
              return;
          }

          if (isReady) {
              setIsApiReady(true);
              return;
          }

          retryTimeout = setTimeout(waitForApi, 3000);
      };

      waitForApi();

      return () => {
          isCancelled = true;
          clearTimeout(retryTimeout);
      };
  }, []);
if(!isApiReady) {
  return <ServerLoadingScreen />
}
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/applications" 
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App;