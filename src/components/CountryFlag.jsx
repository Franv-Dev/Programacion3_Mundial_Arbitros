// diseño de banderas, basado en css
import { Box } from "@mui/material";

export default function CountryFlag({ bg, width = 26, height = 18, sx, ...rest }) {
  return (
    <Box
      sx={{
        width,
        height,
        borderRadius: 0.75,
        overflow: "hidden",
        background: bg,
        boxShadow: "0 0 0 1px rgba(255,255,255,.15) inset",
        ...sx,
      }}
      {...rest}
    />
  );
}