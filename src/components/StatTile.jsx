// casilla de estadistica y modelos
import { Box, Typography } from "@mui/material";

const tileBase = {
  p: 1.75,
  borderRadius: 3,
  bgcolor: "rgba(255,255,255,.045)",
  border: "1px solid rgba(255,255,255,.08)",
};

/** Casilla de estadística: ícono arriba, número grande, etiqueta abajo. */
export default function StatTile({ icon, value, label }) {
  return (
    <Box
      sx={{
        ...tileBase,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        textAlign: "center",
      }}
    >
      {icon}
      <Typography sx={{ fontSize: 28, fontWeight: 900, color: "#fff", lineHeight: 1 }}>
        {value}
      </Typography>
      <Typography sx={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.55)" }}>
        {label}
      </Typography>
    </Box>
  );
}

export { tileBase };