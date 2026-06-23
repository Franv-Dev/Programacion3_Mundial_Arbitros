// components/ArbitroGrid.jsx

import { Box } from "@mui/material";
import ArbitroCard from "./ArbitroCard";

export default function ArbitroGrid({ arbitros, onSelect }) {
  return (
    <Box
      sx={{
        width: "100%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        flexWrap: "wrap",

        gap: {
          xs: 1,
          md: 2,
        },

        mt: 1,
        pb: 1,
      }}
    >
      {arbitros.map((a) => (
        <ArbitroCard
          key={a.id}
          arbitro={a}
          onClick={() => onSelect(a)}
        />
      ))}
    </Box>
  );
}