
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Arbitros from "./pages/Arbitros";
import { COLORS } from "./theme/tokens";

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ minHeight: "100vh", background: COLORS.bg }}>
        <Routes>
          <Route path="/" element={<Navigate to="/arbitros" replace />} />
          <Route path="/arbitros" element={<Arbitros />} />
          {/* Tomi acá va: /login, /registro */}
        </Routes>
      </Box>
    </BrowserRouter>
  );
}