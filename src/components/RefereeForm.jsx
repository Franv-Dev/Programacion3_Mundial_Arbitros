import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box,
} from "@mui/material";
import { COLORS } from "../theme/tokens";

const EMPTY = {
  name: "", lastName: "", nationality: "",
  age: "", yearsRefereeing: "", matchesOfficiated: "",
  yellowCards: "", redCards: "", sanctions: "", imageUrl: "",
};

const TEXT_FIELDS = [
  { name: "name",              label: "Nombre" },
  { name: "lastName",          label: "Apellido" },
  { name: "nationality",       label: "Nacionalidad" },
  { name: "age",               label: "Edad",                type: "number" },
  { name: "yearsRefereeing",   label: "Años arbitrando",     type: "number" },
  { name: "matchesOfficiated", label: "Partidos arbitrados", type: "number" },
  { name: "yellowCards",       label: "Tarjetas amarillas",  type: "number" },
  { name: "redCards",          label: "Tarjetas rojas",      type: "number" },
  { name: "sanctions",         label: "Sanciones",           type: "number" },
];

const fieldSx = {
  bgcolor: "rgba(255,255,255,.07)",
  borderRadius: 2,
  input: { color: "#fff" },
};

export default function RefereeForm({ open, onClose, referee, onSave }) {
  const [form, setForm] = useState(EMPTY);
  const isEdit = Boolean(referee);

  useEffect(() => {
    if (open) {
      setForm(
        referee
          ? {
              name:              referee.name              ?? "",
              lastName:          referee.lastName          ?? "",
              nationality:       referee.nationality       ?? "",
              age:               referee.age               ?? "",
              yearsRefereeing:   referee.yearsRefereeing   ?? "",
              matchesOfficiated: referee.matchesOfficiated ?? "",
              yellowCards:       referee.yellowCards       ?? "",
              redCards:          referee.redCards          ?? "",
              sanctions:         referee.sanctions         ?? "",
              imageUrl:          referee.imageUrl          || "",
            }
          : EMPTY
      );
    }
  }, [referee, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const body = {
      ...(isEdit && { id: referee.id }),
      name:              form.name,
      lastName:          form.lastName,
      nationality:       form.nationality,
      age:               Number(form.age),
      yearsRefereeing:   Number(form.yearsRefereeing),
      matchesOfficiated: Number(form.matchesOfficiated),
      yellowCards:       Number(form.yellowCards),
      redCards:          Number(form.redCards),
      sanctions:         Number(form.sanctions),
      imageUrl:          form.imageUrl,
    };

    const res = await fetch("http://localhost:5000/api/referees/", {
      method: isEdit ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      onSave();
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: COLORS.cardBg,
          border: "1px solid rgba(212,175,55,.25)",
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ color: COLORS.gold, fontWeight: 900 }}>
        {isEdit ? "Editar árbitro" : "Agregar árbitro"}
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            pt: 1,
          }}
        >
          {TEXT_FIELDS.map((f) => (
            <TextField
              key={f.name}
              name={f.name}
              label={f.label}
              type={f.type || "text"}
              value={form[f.name]}
              onChange={handleChange}
              variant="filled"
              InputLabelProps={{ sx: { color: "rgba(255,255,255,.65)" } }}
              sx={fieldSx}
            />
          ))}

          <TextField
            name="imageUrl"
            label="URL de foto"
            value={form.imageUrl}
            onChange={handleChange}
            variant="filled"
            InputLabelProps={{ sx: { color: "rgba(255,255,255,.65)" } }}
            sx={{ ...fieldSx, gridColumn: "1 / -1" }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} sx={{ color: "rgba(255,255,255,.6)" }}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: COLORS.gold,
            color: "#071010",
            fontWeight: 700,
            "&:hover": { bgcolor: COLORS.goldBright },
          }}
        >
          {isEdit ? "Guardar cambios" : "Crear árbitro"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
