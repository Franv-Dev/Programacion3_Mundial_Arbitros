// pages/Arbitros.jsx
import { useState } from "react";
import { Box } from "@mui/material";
import PageHeader from "../components/PageHeader";
import ArbitroGrid from "../components/ArbitroGrid";
import ArbitroModal from "../components/ArbitroModal";
import { ARBITROS } from "../data/arbitros";

export default function Arbitros() {
  const [selected, setSelected] = useState(null);

  return (
    <Box sx={{ px: 3, py: 6 }}>
      <PageHeader />
      <ArbitroGrid arbitros={ARBITROS} onSelect={setSelected} />
      <ArbitroModal arbitro={selected} onClose={() => setSelected(null)} />
    </Box>
  );
}