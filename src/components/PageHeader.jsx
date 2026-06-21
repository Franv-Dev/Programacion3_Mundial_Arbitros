
import { Box, Typography } from "@mui/material";
import { COLORS } from "../theme/tokens";

/** Título + subtítulo + badge "Mundial 2026". */
export default function PageHeader({
  title = "Árbitros del Torneo",
  subtitle = "Toca una tarjeta para ver el perfil completo",
}) {
  return (
    <Box sx={{ textAlign: "center", mb: 6 }}>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: ".32em",
          textTransform: "uppercase",
          color: COLORS.gold,
          border: "1px solid rgba(212,175,55,.32)",
          px: 2,
          py: 0.75,
          borderRadius: 999,
        }}
      >
        <span>⚽</span>
        <span>Mundial 2026</span>
      </Box>
      <Typography sx={{ mt: 2.25, fontWeight: 900, fontSize: 38, color: "#fff" }}>
        {title}
      </Typography>
      <Typography sx={{ mt: 1.25, color: "rgba(255,255,255,.55)", fontWeight: 500 }}>
        {subtitle}
      </Typography>
    </Box>
  );
}