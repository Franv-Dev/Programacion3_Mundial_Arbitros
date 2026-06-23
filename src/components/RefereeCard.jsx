import { Card, Avatar, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CountryFlag from "./CountryFlag";
import { COLORS } from "../theme/tokens";

export default function RefereeCard({ referee, onClick, isAdmin, onEdit, onDelete }) {
  const initials = `${referee.name[0]}${referee.lastName[0]}`.toUpperCase();

  return (
    <Box
      sx={{
        width: 210,
        height: 210,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
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
            bg={referee.flagBg}
            width={110}
            height={70}
            sx={{ borderRadius: 1.5 }}
          />
        </Box>

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
            src={referee.imageUrl || undefined}
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
              {referee.name}
            </Typography>

            <Typography
              sx={{
                color: "#fff",
                fontWeight: 900,
                fontSize: 15,
                lineHeight: 1,
              }}
            >
              {referee.lastName}
            </Typography>

            <Typography
              sx={{
                mt: .4,
                color: "rgba(255,255,255,.6)",
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {referee.nationality}
            </Typography>
          </Box>
        </Box>
      </Card>

      {isAdmin && (
        <Box
          sx={{
            position: "absolute",
            bottom: 14,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 0.5,
            zIndex: 10,
          }}
        >
          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); onEdit(referee); }}
            sx={{
              width: 26,
              height: 26,
              bgcolor: "rgba(212,175,55,.85)",
              color: "#071010",
              "&:hover": { bgcolor: COLORS.gold },
            }}
          >
            <EditIcon sx={{ fontSize: 13 }} />
          </IconButton>

          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); onDelete(referee); }}
            sx={{
              width: 26,
              height: 26,
              bgcolor: "rgba(220,38,38,.85)",
              color: "#fff",
              "&:hover": { bgcolor: "#ef4444" },
            }}
          >
            <DeleteIcon sx={{ fontSize: 13 }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
