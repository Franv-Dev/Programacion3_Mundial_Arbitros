// components/ArbitroCard.jsx
import { Card, Avatar, Box, Typography } from "@mui/material";
import CountryFlag from "./CountryFlag";
import { COLORS } from "../theme/tokens";

/**
 * Tarjeta en forma de rombo (diamante).
 * El Card se gira 45° y su contenido se contragira -45° para quedar derecho.
 * Banderas en los vértices laterales + bandera de fondo dentro del rombo.
 */
export default function ArbitroCard({ arbitro, onClick }) {
  const initials = `${arbitro.nombre[0]}${arbitro.apellido[0]}`.toUpperCase();

  return (
    <Box
      sx={{ width: 296, height: 296, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card
        onClick={onClick}
        elevation={0}
        sx={{
          position: "relative",
          width: 204,
          height: 204,
          transform: "rotate(45deg)",
          borderRadius: 5,
          overflow: "hidden",
          cursor: "pointer",
          border: "2px solid rgba(212,175,55,.5)",
          background: COLORS.cardBg,
          boxShadow: "0 0 22px rgba(212,175,55,.20)",
          transition: "transform .28s cubic-bezier(.2,.7,.3,1), box-shadow .28s ease",
          "&:hover": {
            transform: "rotate(45deg) scale(1.07)",
            boxShadow: "0 0 42px rgba(212,175,55,.5)",
            borderColor: "rgba(212,175,55,.85)",
          },
        }}
      >
        
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            transform: "rotate(-45deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <CountryFlag bg={arbitro.flagBg} width={150} height={104} sx={{ opacity: 0.32, borderRadius: 1.5 }} />
        </Box>

    
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            transform: "rotate(-45deg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          <Avatar
            src={arbitro.foto || undefined}
            sx={{
              width: 74,
              height: 74,
              border: `2.5px solid ${COLORS.gold}`,
              bgcolor: COLORS.field,
              fontWeight: 800,
              fontSize: 24,
              boxShadow: "0 6px 16px rgba(0,0,0,.4)",
            }}
          >
            {initials}
          </Avatar>
          <Box sx={{ textAlign: "center", lineHeight: 1.05 }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: COLORS.gold,
              }}
            >
              {arbitro.nombre}
            </Typography>
            <Typography sx={{ fontSize: 19, fontWeight: 900, color: "#fff" }}>
              {arbitro.apellido}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}