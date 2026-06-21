// components/ArbitroGrid.jsx
import { Grid } from "@mui/material";
import ArbitroCard from "./ArbitroCard";

/** Grilla centrada de tarjetas. */
export default function ArbitroGrid({ arbitros, onSelect }) {
  return (
    <Grid container spacing={3} justifyContent="center">
      {arbitros.map((a) => (
        <Grid item key={a.id}>
          <ArbitroCard arbitro={a} onClick={() => onSelect(a)} />
        </Grid>
      ))}
    </Grid>
  );
}