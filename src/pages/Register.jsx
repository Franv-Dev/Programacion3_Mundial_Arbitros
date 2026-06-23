import { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Checkbox, FormControlLabel, InputAdornment, IconButton } from "@mui/material";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import MailOutlined from "@mui/icons-material/MailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { COLORS } from "../theme/tokens";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", password: "", confirmPassword: "", terms: false });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setForm({ ...form, [name]: name === "terms" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (!form.terms) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }
    register(form.nombre, form.email, form.password);
    navigate("/arbitros");
  };

  return (
    <Box sx={{ minHeight: "100vh", background: COLORS.bg, display: "flex", justifyContent: "center", alignItems: "center", px: 2 }}>
      <Paper elevation={10} sx={{ width: "100%", maxWidth: 500, p: 5, borderRadius: 5, background: COLORS.cardBg, border: "1px solid rgba(240,193,75,0.12)" }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography sx={{ color: COLORS.gold, fontSize: 12, letterSpacing: 2, mb: 1 }}>⚽ MUNDIAL 2026</Typography>
          <Typography variant="h4" sx={{ color: "#fff", fontWeight: 900, mb: 1 }}>Crear cuenta</Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.75)" }}>Completá tus datos para crear tu cuenta.</Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
          <TextField
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            label="Nombre completo"
            variant="filled"
            fullWidth
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.75)" } }}
            InputProps={{ startAdornment: (<InputAdornment position="start"><PersonOutlined sx={{ color: "rgba(255,255,255,0.9)" }} /></InputAdornment>) }}
            sx={{ bgcolor: COLORS.field, borderRadius: 3, input: { color: "#fff" } }}
          />

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

          <TextField
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            label="Confirmar contraseña"
            type={showConfirm ? "text" : "password"}
            variant="filled"
            fullWidth
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.75)" } }}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><LockOutlined sx={{ color: "rgba(255,255,255,0.9)" }} /></InputAdornment>),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirm(!showConfirm)} sx={{ color: "rgba(255,255,255,0.85)" }}>
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ bgcolor: COLORS.field, borderRadius: 3, input: { color: "#fff" } }}
          />

          <FormControlLabel
            control={<Checkbox checked={form.terms} name="terms" onChange={handleChange} sx={{ color: COLORS.gold }} />}
            label={<Typography sx={{ color: "#fff", fontSize: 14 }}>Acepto los Términos y Condiciones</Typography>}
            sx={{ mt: 1 }}
          />

          <Button type="submit" fullWidth sx={{ py: 1.8, borderRadius: 3, bgcolor: COLORS.gold, color: "#071010", fontWeight: 700, fontSize: 16, '&:hover': { bgcolor: COLORS.goldBright } }}>
            Crear cuenta
          </Button>
        </Box>

        <Typography sx={{ color: "rgba(255,255,255,0.75)", textAlign: "center", mt: 3, fontSize: 14 }}>
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" style={{ color: COLORS.gold, textDecoration: "none", fontWeight: 700 }}>
            Iniciá sesión
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
