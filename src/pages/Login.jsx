import { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Checkbox, FormControlLabel, InputAdornment, IconButton } from "@mui/material";
import MailOutlined from "@mui/icons-material/MailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { COLORS } from "../theme/tokens";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setForm({ ...form, [name]: name === "remember" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form.email, form.password);
    navigate("/arbitros");
  };

  return (
    <Box sx={{ minHeight: "100vh", background: COLORS.bg, display: "flex", justifyContent: "center", alignItems: "center", px: 2 }}>
      <Paper elevation={10} sx={{ width: "100%", maxWidth: 440, p: 5, borderRadius: 5, background: COLORS.cardBg, border: "1px solid rgba(240,193,75,0.12)" }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography sx={{ color: COLORS.gold, fontSize: 12, letterSpacing: 2, mb: 1 }}>⚽ MUNDIAL 2026</Typography>
          <Typography variant="h4" sx={{ color: "#fff", fontWeight: 900, mb: 1 }}>Iniciar sesión</Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.75)" }}>Bienvenido de vuelta. Ingresá tus datos para continuar.</Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
          <TextField
            name="email"
            value={form.email}
            onChange={handleChange}
            label="Email"
            variant="filled"
            fullWidth
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.75)" } }}
            InputProps={{ startAdornment: (<InputAdornment position="start"><MailOutlined sx={{ color: "rgba(255,255,255,0.9)" }} /></InputAdornment>) }}
            sx={{ bgcolor: COLORS.field, borderRadius: 3, input: { color: "#fff" } }}
          />

          <TextField
            name="password"
            value={form.password}
            onChange={handleChange}
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            variant="filled"
            fullWidth
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.75)" } }}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><LockOutlined sx={{ color: "rgba(255,255,255,0.9)" }} /></InputAdornment>),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: "rgba(255,255,255,0.85)" }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ bgcolor: COLORS.field, borderRadius: 3, input: { color: "#fff" } }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={form.remember} name="remember" onChange={handleChange} sx={{ color: COLORS.gold }} />}
              label={<Typography sx={{ color: "#fff", fontSize: 14 }}>Recordarme</Typography>}
            />
            <Link to="/olvide-mi-contrasena" style={{ color: COLORS.gold, fontSize: 14, textDecoration: "none" }}>
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>

          <Button type="submit" fullWidth sx={{ py: 1.8, borderRadius: 3, bgcolor: COLORS.gold, color: "#071010", fontWeight: 700, fontSize: 16, '&:hover': { bgcolor: COLORS.goldBright } }}>
            Iniciar sesión
          </Button>
        </Box>

        <Typography sx={{ color: "rgba(255,255,255,0.75)", textAlign: "center", mt: 3, fontSize: 14 }}>
          ¿No tenés cuenta?{' '}
          <Link to="/registro" style={{ color: COLORS.gold, textDecoration: "none", fontWeight: 700 }}>
            Registrate aquí
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
