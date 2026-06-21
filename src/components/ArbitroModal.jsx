// components/ArbitroModal.jsx
import {
  Dialog,
  DialogContent,
  IconButton,
  Avatar,
  Box,
  Grid,
  Chip,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import StyleIcon from "@mui/icons-material/Style";
import BlockIcon from "@mui/icons-material/Block";
import CakeIcon from "@mui/icons-material/Cake";
import PublicIcon from "@mui/icons-material/Public";
import InfoTile from "./InfoTile";
import StatTile from "./StatTile";
import CountryFlag from "./CountryFlag";
import { COLORS } from "../theme/tokens";

const statBox = {
  p: 1.75,
  borderRadius: 3,
  bgcolor: "rgba(255,255,255,.045)",
  border: "1px solid rgba(255,255,255,.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
};
const statLabel = { fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.55)" };

/** Modal de perfil del árbitro. `arbitro` null/undefined => cerrado. */
export default function ArbitroModal({ arbitro, onClose }) {
  const open = Boolean(arbitro);
  const initials = arbitro
    ? `${arbitro.nombre[0]}${arbitro.apellido[0]}`.toUpperCase()
    : "";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(2,9,7,.72)", backdropFilter: "blur(9px)" },
        },
        paper: {
          sx: {
            borderRadius: 4,
            border: "1px solid rgba(212,175,55,.3)",
            background: COLORS.modalBg,
            color: "#fff",
            boxShadow: "0 30px 70px rgba(0,0,0,.6), 0 0 50px rgba(212,175,55,.12)",
          },
        },
      }}
    >
      {arbitro && (
        <DialogContent sx={{ p: 3.5 }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: "rgba(255,255,255,.7)",
              bgcolor: "rgba(255,255,255,.06)",
              "&:hover": { bgcolor: "rgba(255,255,255,.14)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          {/* Encabezado */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={arbitro.foto || undefined}
              sx={{
                width: 72,
                height: 72,
                border: `3px solid ${COLORS.gold}`,
                bgcolor: COLORS.field,
                fontWeight: 800,
                fontSize: 24,
              }}
            >
              {initials}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900, lineHeight: 1.1 }}>
                {arbitro.nombre} {arbitro.apellido}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <CountryFlag bg={arbitro.flagBg} />
                <Typography sx={{ fontWeight: 600, color: "rgba(255,255,255,.62)" }}>
                  {arbitro.pais}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Edad / internacional */}
          <Grid container spacing={1.5} sx={{ mt: 1.5 }}>
            <Grid item xs={6}>
              <InfoTile icon={<CakeIcon sx={{ color: COLORS.gold }} />} label="Edad" value={`${arbitro.edad} años`} />
            </Grid>
            <Grid item xs={6}>
              <InfoTile
                icon={<PublicIcon sx={{ color: COLORS.gold }} />}
                label="Internacional"
                value={`${arbitro.aniosArbitrando} años`}
              />
            </Grid>
          </Grid>

          {/* Estadísticas */}
          <Divider sx={{ my: 2.5, borderColor: "rgba(212,175,55,.25)" }}>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: COLORS.gold,
              }}
            >
              Estadísticas · Mundial 2026
            </Typography>
          </Divider>

          <Grid container spacing={1.5}>
            <Grid item xs={6}>
              <StatTile icon={<SportsSoccerIcon sx={{ color: "#fff" }} />} value={arbitro.partidos} label="Partidos arbitrados" />
            </Grid>
            <Grid item xs={6}>
              <Box sx={statBox}>
                <Chip label={arbitro.amarillas} color="warning" icon={<StyleIcon />} sx={{ fontWeight: 900, fontSize: 16 }} />
                <Typography sx={statLabel}>Tarjetas amarillas</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={statBox}>
                <Chip label={arbitro.rojas} color="error" icon={<StyleIcon />} sx={{ fontWeight: 900, fontSize: 16 }} />
                <Typography sx={statLabel}>Tarjetas rojas</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <StatTile icon={<BlockIcon sx={{ color: "#fff" }} />} value={arbitro.sanciones} label="Sanciones aplicadas" />
            </Grid>
          </Grid>
        </DialogContent>
      )}
    </Dialog>
  );
}