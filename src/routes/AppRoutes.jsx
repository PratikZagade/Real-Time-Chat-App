import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../components/Auth/AuthPage";
import Chat from "../pages/Chat";

const AppRoutes = () => {

  const token = localStorage.getItem("token");

  return (
    <Routes>

      {/* Default Route */}
      <Route
        path="/"
        element={
          token ? <Navigate to="/chat" /> : <Navigate to="/auth" />
        }
      />

      {/* Auth Page */}
      <Route
        path="/auth"
        element={
          token ? <Navigate to="/chat" /> : <AuthPage />
        }
      />

      {/* Protected Chat Route 🔥 */}
      <Route
        path="/chat"
        element={
          token ? <Chat /> : <Navigate to="/auth" />
        }
      />

    </Routes>
  );
};

export default AppRoutes;