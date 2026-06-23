import { useState, useMemo } from "react";
import {
  Box, CircularProgress, Typography, Button, Stack,
  TextField, Select, MenuItem, FormControl, InputLabel,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import PageHeader from "../components/PageHeader";
import StatsBar from "../components/StatsBar";
import RefereeGrid from "../components/RefereeGrid";
import RefereeModal from "../components/RefereeModal";
import RefereeForm from "../components/RefereeForm";
import useFetch from "../hooks/useFetch";
import { COLORS } from "../theme/tokens";

import worldcupBg from "../assets/worldcup-bg.png";

const FLAG_GRADIENTS = {
  Argentina: "linear-gradient(180deg,#75aadb 0 33.33%,#fff 33.33% 66.66%,#75aadb 66.66% 100%)",
  Polonia: "linear-gradient(180deg,#fff 0 50%,#dc143c 50% 100%)",
  Francia: "linear-gradient(90deg,#0055a4 0 33.33%,#fff 33.33% 66.66%,#ef4135 66.66% 100%)",
  France: "linear-gradient(90deg,#002395 0 33.33%,#fff 33.33% 66.66%,#ed2939 66.66% 100%)",
  Brasil: "linear-gradient(180deg,#009c3b 0 25%,#ffdf00 25% 75%,#009c3b 75% 100%)",
  Brazil: "linear-gradient(180deg,#009c3b 0 25%,#ffdf00 25% 75%,#009c3b 75% 100%)",
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
  England: "linear-gradient(90deg,#012169 0 25%,#fff 25% 37.5%,#c8102e 37.5% 62.5%,#fff 62.5% 75%,#012169 75% 100%)",
  Qatar: "linear-gradient(180deg,#8d1b3d 0 100%)",
  Gabon: "linear-gradient(180deg,#009e60 0 33.33%,#fcd116 33.33% 66.66%,#003082 66.66% 100%)",
  "El Salvador": "linear-gradient(180deg,#0f47af 0 33.33%,#fff 33.33% 66.66%,#0f47af 66.66% 100%)",
  Mauritania: "linear-gradient(180deg,#006233 0 100%)",
  Paraguay: "linear-gradient(180deg,#d52b1e 0 33.33%,#fff 33.33% 66.66%,#009a44 66.66% 100%)",
  "United States": "linear-gradient(180deg,#b22234 0 33.33%,#fff 33.33% 66.66%,#3c3b6e 66.66% 100%)",
  Australia: "linear-gradient(180deg,#00008b 0 50%,#00008b 50% 100%)",
  Chile: "linear-gradient(180deg,#d52b1e 0 50%,#fff 50% 100%)",
  Algeria: "linear-gradient(90deg,#fff 0 50%,#006233 50% 100%)",
  Spain: "linear-gradient(180deg,#c60b1e 0 25%,#ffc400 25% 75%,#c60b1e 75% 100%)",
  Bahrain: "linear-gradient(180deg,#ce1126 0 100%)",
  Romania: "linear-gradient(90deg,#002B7F 0 33.33%,#FCD116 33.33% 66.66%,#CE1126 66.66% 100%)",
  China: "linear-gradient(180deg,#de2910 0 100%)",
  Jordan: "linear-gradient(180deg,#007a3d 0 33.33%,#fff 33.33% 66.66%,#000 66.66% 100%)",
  Netherlands: "linear-gradient(180deg,#ae1c28 0 33.33%,#fff 33.33% 66.66%,#21468b 66.66% 100%)",
  Poland: "linear-gradient(180deg,#fff 0 50%,#dc143c 50% 100%)",
  Italy: "linear-gradient(90deg,#009246 0 33.33%,#fff 33.33% 66.66%,#ce2b37 66.66% 100%)",
  Honduras: "linear-gradient(180deg,#0073cf 0 33.33%,#fff 33.33% 66.66%,#0073cf 66.66% 100%)",
  Sweden: "linear-gradient(180deg,#006aa7 0 33.33%,#fecc02 33.33% 66.66%,#006aa7 66.66% 100%)",
  Egypt: "linear-gradient(180deg,#ce1126 0 33.33%,#fff 33.33% 66.66%,#000 66.66% 100%)",
  Belize: "linear-gradient(180deg,#003f87 0 33.33%,#fff 33.33% 66.66%,#003f87 66.66% 100%)",
  Portugal: "linear-gradient(90deg,#006600 0 40%,#ff0000 40% 100%)",
  Uzbekistan: "linear-gradient(180deg,#1eb53a 0 33.33%,#fff 33.33% 66.66%,#ce1126 66.66% 100%)",
  Venezuela: "linear-gradient(180deg,#cf142b 0 33.33%,#ffd100 33.33% 66.66%,#00247d 66.66% 100%)",
  Slovenia: "linear-gradient(180deg,#003DA5 0 33.33%,#fff 33.33% 66.66%,#E4002B 66.66% 100%)",
  Germany: "linear-gradient(180deg,#000 0 33.33%,#dd0000 33.33% 66.66%,#ffce00 66.66% 100%)",
};

const getRefereeWithFlag = (referee) => ({
  ...referee,
  flagBg: FLAG_GRADIENTS[referee.nationality] || "linear-gradient(180deg,#555 0 100%)",
});

export default function Referees() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "Admin";

  const [selected, setSelected] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [nationalityFilter, setNationalityFilter] = useState("");

  const { data, loading, error } = useFetch("http://localhost:5000/api/referees/", refreshKey);
  const referees = data.map(getRefereeWithFlag);

  const nationalities = useMemo(
    () => [...new Set(referees.map((r) => r.nationality))].sort(),
    [referees]
  );

  const filteredReferees = useMemo(() => {
    const q = search.toLowerCase();
    return referees.filter((r) => {
      const matchesText = !q || `${r.name} ${r.lastName}`.toLowerCase().includes(q);
      const matchesNationality = !nationalityFilter || r.nationality === nationalityFilter;
      return matchesText && matchesNationality;
    });
  }, [referees, search, nationalityFilter]);

  const clearFilters = () => { setSearch(""); setNationalityFilter(""); };

  const refresh = () => setRefreshKey((k) => k + 1);

  const handleEdit = (referee) => {
    setEditTarget(referee);
    setFormOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/referees/${deleteTarget.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setDeleteTarget(null);
    refresh();
  };

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

        <StatsBar referees={referees} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ width: "100%", maxWidth: 700, mb: 2 }}
        >
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar árbitro..."
            variant="filled"
            size="small"
            fullWidth
            InputLabelProps={{ sx: { color: "rgba(255,255,255,.65)" } }}
            inputProps={{ sx: { color: "#fff" } }}
            sx={{
              flex: 2,
              bgcolor: "rgba(255,255,255,.07)",
              borderRadius: 2,
              "& .MuiFilledInput-root": {
                borderRadius: 2,
                "&:before": { borderBottomColor: "rgba(212,175,55,.3)" },
                "&:hover:before": { borderBottomColor: COLORS.gold },
                "&:after": { borderBottomColor: COLORS.gold },
              },
            }}
          />

          <FormControl
            variant="filled"
            size="small"
            sx={{
              flex: 1,
              minWidth: 160,
              bgcolor: "rgba(255,255,255,.07)",
              borderRadius: 2,
              "& .MuiFilledInput-root": {
                borderRadius: 2,
                "&:before": { borderBottomColor: "rgba(212,175,55,.3)" },
                "&:hover:before": { borderBottomColor: COLORS.gold },
                "&:after": { borderBottomColor: COLORS.gold },
              },
            }}
          >
            <InputLabel sx={{ color: "rgba(255,255,255,.65)" }}>Nacionalidad</InputLabel>
            <Select
              value={nationalityFilter}
              onChange={(e) => setNationalityFilter(e.target.value)}
              sx={{ color: "#fff" }}
              MenuProps={{ PaperProps: { sx: { bgcolor: COLORS.fieldDeep, color: "#fff" } } }}
            >
              <MenuItem value="">Todas</MenuItem>
              {nationalities.map((n) => (
                <MenuItem key={n} value={n}>{n}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            size="small"
            onClick={clearFilters}
            sx={{
              color: COLORS.gold,
              borderColor: "rgba(212,175,55,.5)",
              whiteSpace: "nowrap",
              "&:hover": { borderColor: COLORS.gold, bgcolor: "rgba(212,175,55,.08)" },
            }}
          >
            Limpiar
          </Button>
        </Stack>

        {isAdmin && (
          <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => { setEditTarget(null); setFormOpen(true); }}
              sx={{
                color: COLORS.gold,
                borderColor: COLORS.gold,
                fontWeight: 700,
                "&:hover": {
                  borderColor: COLORS.goldBright,
                  bgcolor: "rgba(212,175,55,.08)",
                },
              }}
            >
              Agregar árbitro
            </Button>
          </Box>
        )}

        {loading && (
          <CircularProgress sx={{ color: "#d4af37", mt: 4 }} />
        )}

        {error && (
          <Typography sx={{ color: "#ef4444", mt: 4 }}>{error}</Typography>
        )}

        {!loading && !error && (
          <RefereeGrid
            referees={filteredReferees}
            onSelect={setSelected}
            isAdmin={isAdmin}
            onEdit={handleEdit}
            onDelete={setDeleteTarget}
          />
        )}

        <RefereeModal
          referee={selected}
          onClose={() => setSelected(null)}
        />

        <RefereeForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          referee={editTarget}
          onSave={refresh}
        />

        <Dialog
          open={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          PaperProps={{
            sx: {
              background: COLORS.cardBg,
              border: "1px solid rgba(212,175,55,.25)",
              borderRadius: 3,
            },
          }}
        >
          <DialogTitle sx={{ color: "#fff", fontWeight: 900 }}>
            Eliminar árbitro
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ color: "rgba(255,255,255,.75)" }}>
              ¿Confirmás que querés eliminar a{" "}
              <strong style={{ color: "#fff" }}>
                {deleteTarget?.name} {deleteTarget?.lastName}
              </strong>
              ? Esta acción no se puede deshacer.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              onClick={() => setDeleteTarget(null)}
              sx={{ color: "rgba(255,255,255,.6)" }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              sx={{
                bgcolor: "#dc2626",
                color: "#fff",
                fontWeight: 700,
                "&:hover": { bgcolor: "#ef4444" },
              }}
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
