import { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { COLORS } from "../theme/tokens";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  };

  return (
    <Box sx={{ minHeight: "100vh", background: COLORS.bg, display: "flex", justifyContent: "center", alignItems: "center", px: 2 }}>
      <Paper elevation={10} sx={{ width: "100%", maxWidth: 440, p: 5, borderRadius: 5, background: COLORS.cardBg, border: "1px solid rgba(240,193,75,0.12)" }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography sx={{ color: COLORS.gold, fontSize: 12, letterSpacing: 2, mb: 1 }}>⚽ MUNDIAL 2026</Typography>
          <Typography variant="h4" sx={{ color: "#fff", fontWeight: 900, mb: 1 }}>Recuperar contraseña</Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.75)" }}>
            Ingresá tu email y te enviaremos los pasos para restablecerla.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
          <TextField
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="filled"
            fullWidth
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.75)" } }}
            sx={{ bgcolor: COLORS.field, borderRadius: 3, input: { color: "#fff" } }}
          />

          <Button type="submit" fullWidth sx={{ py: 1.8, borderRadius: 3, bgcolor: COLORS.gold, color: "#071010", fontWeight: 700, fontSize: 16, '&:hover': { bgcolor: COLORS.goldBright } }}>
            Enviar enlace
          </Button>

          {sent ? (
            <Typography sx={{ color: COLORS.gold, textAlign: "center", mt: 1 }}>
              Si el email existe, recibirás un enlace en tu bandeja de entrada.
            </Typography>
          ) : null}

          <Typography sx={{ color: "rgba(255,255,255,0.75)", textAlign: "center", mt: 2, fontSize: 14 }}>
            Volver a {" "}
            <Link to="/login" style={{ color: COLORS.gold, textDecoration: "none", fontWeight: 700 }}>
              iniciar sesión
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
