import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Arbitros from "./pages/Arbitros";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/registro"
          element={<Register />}
        />

        <Route
          path="/olvide-mi-contrasena"
          element={<ForgotPassword />}
        />

        <Route
          path="/arbitros"
          element={
            <ProtectedRoute>
              <Arbitros />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}