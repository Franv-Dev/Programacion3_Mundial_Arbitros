import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";

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

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    setForm({
      ...form,
      [name]: name === "remember" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(form.email, form.password);

    navigate("/referees");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,

        background: `
          radial-gradient(circle at top,
          rgba(212,175,55,.15),
          transparent 30%),
          linear-gradient(
          135deg,
          #03110d 0%,
          #08291d 50%,
          #04110d 100%)
        `,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 450,
          p: 5,
          borderRadius: 5,

          background: `
          linear-gradient(
          145deg,
          rgba(9,39,28,.95),
          rgba(5,17,22,.95))
          `,

          backdropFilter: "blur(20px)",

          border: "1px solid rgba(212,175,55,.25)",

          boxShadow: `
            0 20px 60px rgba(0,0,0,.7),
            0 0 30px rgba(212,175,55,.15)
          `,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            sx={{
              color: COLORS.gold,
              fontSize: 12,
              letterSpacing: 3,
              mb: 1,
            }}
          >
            ⚽ MUNDIAL 2026
          </Typography>

          <Typography
            sx={{
              color: "#fff",
              fontWeight: 900,
              fontSize: 48,
              mb: 1,
            }}
          >
            Iniciar sesión
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,.7)",
            }}
          >
            Bienvenido de vuelta. Ingresá tus datos para continuar.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}
          sx={{
            display: "grid",
            gap: 2,
          }}
        >
          <TextField
            name="email"
            label="Email"
            variant="filled"
            fullWidth
            value={form.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlined sx={{ color: "#fff" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: COLORS.field,
              borderRadius: 3,
              input: { color: "#fff" },
            }}
          />

          <TextField
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            variant="filled"
            fullWidth
            value={form.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined sx={{ color: "#fff" }} />
                </InputAdornment>
              ),

              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{ color: "#fff" }}
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: COLORS.field,
              borderRadius: 3,
              input: { color: "#fff" },
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.remember}
                  name="remember"
                  onChange={handleChange}
                  sx={{ color: COLORS.gold }}
                />
              }
              label={
                <Typography sx={{ color: "#fff" }}>
                  Recordarme
                </Typography>
              }
            />

            <Link
              to="/olvide-mi-contrasena"
              style={{
                color: COLORS.gold,
                textDecoration: "none",
              }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            sx={{
              py: 1.8,
              borderRadius: 3,
              bgcolor: COLORS.gold,
              color: "#08110d",
              fontWeight: 900,
              fontSize: 16,

              "&:hover": {
                bgcolor: COLORS.goldBright,
              },
            }}
          >
            INICIAR SESIÓN
          </Button>
        </Box>

        <Typography
          sx={{
            mt: 4,
            textAlign: "center",
            color: "rgba(255,255,255,.7)",
          }}
        >
          ¿No tenés cuenta?{" "}
          <Link
            to="/register"
            style={{
              color: COLORS.gold,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Registrate aquí
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}