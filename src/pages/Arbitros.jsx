import { useState } from "react";
import { Box } from "@mui/material";

import PageHeader from "../components/PageHeader";
import StatsBar from "../components/StatsBar";
import ArbitroGrid from "../components/ArbitroGrid";
import ArbitroModal from "../components/ArbitroModal";

import { ARBITROS } from "../data/arbitros";
import worldcupBg from "../assets/worldcup-bg.png";

export default function Arbitros() {
  const [selected, setSelected] = useState(null);

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

        <ArbitroGrid
          arbitros={ARBITROS}
          onSelect={setSelected}
        />

        <ArbitroModal
          arbitro={selected}
          onClose={() => setSelected(null)}
        />
      </Box>
    </Box>
  );
}