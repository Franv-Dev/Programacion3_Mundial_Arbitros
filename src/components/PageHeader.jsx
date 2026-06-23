// components/PageHeader.jsx

import { Box, Typography } from "@mui/material";
import { COLORS } from "../theme/tokens";

export default function PageHeader({
  title = "Árbitros del Mundial 2026",
  subtitle = "Descubrí el perfil completo de los jueces internacionales del Mundial 2026",
}) {
  return (
    <Box
      sx={{
        textAlign: "center",
        pt: 2,
        mb: 3,
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Badge */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          px: 2.5,
          py: .8,
          borderRadius: 999,
          border: "1px solid rgba(212,175,55,.35)",
          background: "rgba(255,255,255,.03)",
          backdropFilter: "blur(15px)",
        }}
      >
        <Typography
          sx={{
            color: COLORS.gold,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: ".28em",
            textTransform: "uppercase",
          }}
        >
          ⚽ Mundial 2026
        </Typography>
      </Box>

      {/* Título */}
      <Typography
        sx={{
          mt: 1.5,
          color: "#fff",
          fontWeight: 900,
          lineHeight: 1,

          fontSize: {
            xs: 34,
            sm: 44,
            md: 52,
          },

          textShadow: "0 6px 20px rgba(0,0,0,.5)",
        }}
      >
        {title}
      </Typography>

      {/* Línea dorada */}
      <Box
        sx={{
          width: 90,
          height: 3,
          mx: "auto",
          mt: 1.5,
          borderRadius: 10,
          background: `linear-gradient(90deg,transparent,${COLORS.gold},transparent)`,
        }}
      />

      {/* Subtítulo */}
      <Typography
        sx={{
          mt: 1.5,
          color: "rgba(255,255,255,.68)",
          fontSize: {
            xs: 14,
            md: 16,
          },
          maxWidth: 650,
          mx: "auto",
          px: 2,
          lineHeight: 1.5,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}