import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { COLORS } from "../theme/tokens";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: COLORS.fieldDeep,
        borderBottom: "1px solid rgba(212,175,55,.2)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          sx={{
            color: COLORS.gold,
            fontWeight: 900,
            fontSize: 18,
            letterSpacing: ".1em",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          ⚽ Mundial 2026
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            onClick={() => navigate("/referees")}
            sx={{ color: "#fff", fontWeight: 600 }}
          >
            Árbitros
          </Button>

          {user ? (
            <>
              <Typography
                sx={{
                  color: "rgba(255,255,255,.65)",
                  fontSize: 14,
                  px: 1,
                }}
              >
                {user.name} {user.lastName}
              </Typography>

              <Button
                onClick={handleLogout}
                variant="outlined"
                sx={{
                  color: COLORS.gold,
                  borderColor: "rgba(212,175,55,.5)",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: COLORS.gold,
                    bgcolor: "rgba(212,175,55,.08)",
                  },
                }}
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/login")}
                sx={{ color: "#fff", fontWeight: 600 }}
              >
                Iniciar sesión
              </Button>

              <Button
                onClick={() => navigate("/register")}
                variant="outlined"
                sx={{
                  color: COLORS.gold,
                  borderColor: "rgba(212,175,55,.5)",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: COLORS.gold,
                    bgcolor: "rgba(212,175,55,.08)",
                  },
                }}
              >
                Registrarse
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
