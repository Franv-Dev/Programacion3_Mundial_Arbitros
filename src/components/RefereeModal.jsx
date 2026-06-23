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
  p: 1.5,
  borderRadius: 3,
  bgcolor: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
};

const statLabel = {
  fontSize: 11,
  fontWeight: 600,
  color: "rgba(255,255,255,.6)",
};

export default function RefereeModal({ referee, onClose }) {
  const open = Boolean(referee);

  const initials = referee
    ? `${referee.name[0]}${referee.lastName[0]}`.toUpperCase()
    : "";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(2,9,7,.75)",
            backdropFilter: "blur(10px)",
          },
        },

        paper: {
          sx: {
            borderRadius: 5,

            background: `
              linear-gradient(
                160deg,
                rgba(15,54,37,.98),
                rgba(5,19,29,.98)
              )
            `,

            border: "1px solid rgba(212,175,55,.3)",

            color: "#fff",

            overflow: "hidden",

            position: "relative",

            boxShadow: `
              0 30px 80px rgba(0,0,0,.7),
              0 0 40px rgba(212,175,55,.15)
            `,

            "&::before": {
              content: '""',
              position: "absolute",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "rgba(212,175,55,.08)",
              filter: "blur(80px)",
              top: -120,
              right: -100,
            },
          },
        },
      }}
    >
      {referee && (
        <DialogContent sx={{ p: 3.5 }}>
          {/* Botón cerrar */}
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 15,
              right: 15,
              color: "white",
              bgcolor: "rgba(255,255,255,.06)",

              "&:hover": {
                bgcolor: "rgba(255,255,255,.12)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar
              src={referee.imageUrl || undefined}
              sx={{
                width: 75,
                height: 75,
                bgcolor: COLORS.field,
                border: `3px solid ${COLORS.gold}`,
                fontWeight: 900,
                fontSize: 24,

                boxShadow: `
                  0 0 25px rgba(212,175,55,.4),
                  0 8px 20px rgba(0,0,0,.5)
                `,
              }}
            >
              {initials}
            </Avatar>

            <Box>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: 32,
                  lineHeight: 1.1,
                }}
              >
                {referee.name} {referee.lastName}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 1,
                }}
              >
                <CountryFlag bg={referee.flagBg} />

                <Typography
                  sx={{
                    color: "rgba(255,255,255,.7)",
                    fontWeight: 600,
                  }}
                >
                  {referee.nationality}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Información */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <InfoTile
                icon={<CakeIcon sx={{ color: COLORS.gold }} />}
                label="Edad"
                value={`${referee.age} años`}
              />
            </Grid>

            <Grid item xs={6}>
              <InfoTile
                icon={<PublicIcon sx={{ color: COLORS.gold }} />}
                label="Internacional"
                value={`${referee.yearsRefereeing} años`}
              />
            </Grid>
          </Grid>

          {/* Título estadísticas */}
          <Divider
            sx={{
              my: 3,
              borderColor: "rgba(212,175,55,.15)",
            }}
          >
            <Typography
              sx={{
                color: COLORS.gold,
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: ".2em",
                textTransform: "uppercase",
              }}
            >
              Estadísticas · Mundial 2026
            </Typography>
          </Divider>

          {/* Estadísticas */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <StatTile
                icon={<SportsSoccerIcon sx={{ color: "#fff" }} />}
                value={referee.matchesOfficiated}
                label="Partidos arbitrados"
              />
            </Grid>

            <Grid item xs={6}>
              <Box sx={statBox}>
                <Chip
                  icon={<StyleIcon />}
                  label={referee.yellowCards}
                  color="warning"
                  sx={{
                    fontWeight: 900,
                    fontSize: 16,
                  }}
                />

                <Typography sx={statLabel}>
                  Tarjetas amarillas
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={statBox}>
                <Chip
                  icon={<StyleIcon />}
                  label={referee.redCards}
                  color="error"
                  sx={{
                    fontWeight: 900,
                    fontSize: 16,
                  }}
                />

                <Typography sx={statLabel}>
                  Tarjetas rojas
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <StatTile
                icon={<BlockIcon sx={{ color: "#fff" }} />}
                value={referee.sanctions}
                label="Sanciones aplicadas"
              />
            </Grid>
          </Grid>
        </DialogContent>
      )}
    </Dialog>
  );
}
