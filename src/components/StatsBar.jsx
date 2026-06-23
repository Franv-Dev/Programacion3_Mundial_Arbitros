import { Box, Paper, Typography } from "@mui/material";
import { COLORS } from "../theme/tokens";

export default function StatsBar() {
  const stats = [
    { valor: 64, texto: "Partidos" },
    { valor: 36, texto: "Árbitros" },
    { valor: 230, texto: "Amarillas" },
    { valor: 8, texto: "Rojas" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        flexWrap: "wrap",
        mb: 3,
      }}
    >
      {stats.map((s) => (
        <Paper
          key={s.texto}
          elevation={0}
          sx={{
            width: 110,
            height: 85,
            borderRadius: 3,
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(212,175,55,.25)",
            backdropFilter: "blur(12px)",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            transition: ".3s",

            "&:hover": {
              borderColor: COLORS.gold,
              boxShadow: "0 0 20px rgba(212,175,55,.15)",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 900,
              color: COLORS.gold,
              lineHeight: 1,
            }}
          >
            {s.valor}
          </Typography>

          <Typography
            sx={{
              mt: .5,
              color: "rgba(255,255,255,.75)",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            {s.texto}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}