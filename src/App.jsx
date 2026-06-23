import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Referees from "./pages/Referees";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/referees" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/referees"
          element={
            <ProtectedRoute>
              <Referees />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
