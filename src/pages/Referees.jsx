import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

import PageHeader from "../components/PageHeader";
import StatsBar from "../components/StatsBar";
import RefereeGrid from "../components/RefereeGrid";
import RefereeModal from "../components/RefereeModal";
import useFetch from "../hooks/useFetch";

import worldcupBg from "../assets/worldcup-bg.png";

const FLAG_GRADIENTS = {
  Argentina: "linear-gradient(180deg,#75aadb 0 33.33%,#fff 33.33% 66.66%,#75aadb 66.66% 100%)",
  Polonia: "linear-gradient(180deg,#fff 0 50%,#dc143c 50% 100%)",
  Francia: "linear-gradient(90deg,#0055a4 0 33.33%,#fff 33.33% 66.66%,#ef4135 66.66% 100%)",
  Brasil: "linear-gradient(180deg,#009c3b 0 25%,#ffdf00 25% 75%,#009c3b 75% 100%)",
  Alemania: "linear-gradient(180deg,#000 0 33.33%,#dd0000 33.33% 66.66%,#ffce00 66.66% 100%)",
  España: "linear-gradient(180deg,#c60b1e 0 25%,#ffc400 25% 75%,#c60b1e 75% 100%)",
  Italia: "linear-gradient(90deg,#009246 0 33.33%,#fff 33.33% 66.66%,#ce2b37 66.66% 100%)",
  Uruguay: "linear-gradient(180deg,#fff 0 50%,#5aaae7 50% 100%)",
  Mexico: "linear-gradient(90deg,#006847 0 33.33%,#fff 33.33% 66.66%,#ce1126 66.66% 100%)",
  Colombia: "linear-gradient(180deg,#fcd116 0 33.33%,#003087 33.33% 66.66%,#ce1126 66.66% 100%)",
  Egipto: "linear-gradient(180deg,#ce1126 0 33.33%,#fff 33.33% 66.66%,#000 66.66% 100%)",
  Japon: "linear-gradient(180deg,#fff 0 100%)",
  Paises_Bajos: "linear-gradient(180deg,#ae1c28 0 33.33%,#fff 33.33% 66.66%,#21468b 66.66% 100%)",
  Senegal: "linear-gradient(90deg,#00853f 0 33.33%,#fdef42 33.33% 66.66%,#e31b23 66.66% 100%)",
};

const getRefereeWithFlag = (referee) => ({
  ...referee,
  flagBg: FLAG_GRADIENTS[referee.nationality] || "linear-gradient(180deg,#555 0 100%)",
});

export default function Referees() {
  const [selected, setSelected] = useState(null);
  const { data, loading, error } = useFetch("http://localhost:5000/api/referees/");
  const referees = data.map(getRefereeWithFlag);

  return (
    <Box
      sx={{
        minHeight: "100vh",

        backgroundImage: `
          linear-gradient(
            rgba(2,9,8,.82),
            rgba(2,9,8,.88)
          ),
          url(${worldcupBg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* brillo superior */}
      <Box
        sx={{
          position: "absolute",
          width: 650,
          height: 650,
          borderRadius: "50%",
          background: "rgba(212,175,55,.08)",
          filter: "blur(120px)",
          top: -300,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* CONTENIDO */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,

          width: "100%",
          maxWidth: "1200px",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          px: 2,
        }}
      >
        <PageHeader />

        <StatsBar />

        {loading && (
          <CircularProgress sx={{ color: "#d4af37", mt: 4 }} />
        )}

        {error && (
          <Typography sx={{ color: "#ef4444", mt: 4 }}>{error}</Typography>
        )}

        {!loading && !error && (
          <RefereeGrid
            referees={referees}
            onSelect={setSelected}
          />
        )}

        <RefereeModal
          referee={selected}
          onClose={() => setSelected(null)}
        />
      </Box>
    </Box>
  );
}
