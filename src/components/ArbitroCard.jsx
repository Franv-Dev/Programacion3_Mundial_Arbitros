// components/ArbitroCard.jsx

import { Card, Avatar, Box, Typography } from "@mui/material";
import CountryFlag from "./CountryFlag";
import { COLORS } from "../theme/tokens";

export default function ArbitroCard({ arbitro, onClick }) {
  const initials = `${arbitro.nombre[0]}${arbitro.apellido[0]}`.toUpperCase();

  return (
    <Box
      sx={{
        width: 210,
        height: 210,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        onClick={onClick}
        elevation={0}
        sx={{
          position: "relative",
          width: 150,
          height: 150,
          transform: "rotate(45deg)",
          borderRadius: 4,
          overflow: "hidden",
          cursor: "pointer",

          background: `
            linear-gradient(
              145deg,
              rgba(16,54,37,.95),
              rgba(5,19,29,.98)
            )
          `,

          border: "1px solid rgba(212,175,55,.35)",

          boxShadow: `
            0 8px 25px rgba(0,0,0,.5),
            0 0 15px rgba(212,175,55,.15)
          `,

          transition: ".35s",

          "&:hover": {
            transform: "rotate(45deg) scale(1.08)",
            borderColor: COLORS.gold,
            boxShadow: `
              0 12px 35px rgba(0,0,0,.7),
              0 0 30px rgba(212,175,55,.4)
            `,
          },
        }}
      >
        {/* bandera de fondo */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            transform: "rotate(-45deg)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.18,
          }}
        >
          <CountryFlag
            bg={arbitro.flagBg}
            width={110}
            height={70}
            sx={{ borderRadius: 1.5 }}
          />
        </Box>

        {/* contenido */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            transform: "rotate(-45deg)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            src={arbitro.foto || undefined}
            sx={{
              width: 55,
              height: 55,
              bgcolor: COLORS.field,
              border: `2px solid ${COLORS.gold}`,
              fontWeight: 900,
              fontSize: 18,
              boxShadow: "0 0 18px rgba(212,175,55,.35)",
            }}
          >
            {initials}
          </Avatar>

          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                color: COLORS.gold,
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: ".15em",
                textTransform: "uppercase",
              }}
            >
              {arbitro.nombre}
            </Typography>

            <Typography
              sx={{
                color: "#fff",
                fontWeight: 900,
                fontSize: 15,
                lineHeight: 1,
              }}
            >
              {arbitro.apellido}
            </Typography>

            <Typography
              sx={{
                mt: .4,
                color: "rgba(255,255,255,.6)",
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {arbitro.pais}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}