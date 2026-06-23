// components/ArbitroGrid.jsx

import { Box } from "@mui/material";
import RefereeCard from "./RefereeCard";

export default function RefereeGrid({ referees, onSelect }) {
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
      {referees.map((referee) => (
        <RefereeCard
          key={referee.id}
          referee={referee}
          onClick={() => onSelect(referee)}
        />
      ))}
    </Box>
  );
}
