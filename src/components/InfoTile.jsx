// diseño de casilla de estadistica
import { Box, Typography } from "@mui/material";
import { tileBase } from "./StatTile";

export default function InfoTile({ icon, label, value }) {
  return (
    <Box sx={tileBase}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
        {icon}
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,.5)",
          }}
        >
          {label}
        </Typography>
      </Box>
      <Typography sx={{ mt: 0.5, fontSize: 22, fontWeight: 900, color: "#fff" }}>
        {value}
      </Typography>
    </Box>
  );
}