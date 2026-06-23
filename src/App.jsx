import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Arbitros from "./pages/Arbitros";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import { COLORS } from "./theme/tokens";

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ minHeight: "100vh", background: COLORS.bg }}>
        <Routes>

          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />

          <Route path="/registro" element={<Register />} />
          <Route path="/olvide-mi-contrasena" element={<ForgotPassword />} />

          <Route
            path="/arbitros"
            element={
              <ProtectedRoute>
                <Arbitros />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Box>
    </BrowserRouter>
  );
}