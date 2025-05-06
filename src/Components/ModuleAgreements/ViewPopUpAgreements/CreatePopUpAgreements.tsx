import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    Button,
    IconButton,
    Grid,
    TextField,
    MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
  
const DEFAULT_VALUES = {
    origen: "",
    sede: "",
    compromiso: "",
    responsable1: "",
    responsable2: "",
    fechaSeguimiento: "",
    estado: "",
    plazo: "",
    accionRealizada: "",
    observaciones: "",
};
  
export default function CreatePopUpAgreements({ open, onClose, onCreate, sedes, estados, plazos }) {
    const [form, setForm] = useState(DEFAULT_VALUES);
  
    const handleChange = (field) => (e) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };
  
    const handleSubmit = () => {
      onCreate(form);
      setForm(DEFAULT_VALUES);
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          Nuevo Acuerdo
          <IconButton sx={{ ml: "auto" }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Sección Información Básica */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Información Básica
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 2 }}>
                <Typography variant="body2" fontWeight="medium">Origen:</Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={form.origen}
                  onChange={handleChange("origen")}
                  placeholder="e.g. BUGA (regionalización)"
                />
  
                <Typography variant="body2" fontWeight="medium">Sede:</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={form.sede}
                  onChange={handleChange("sede")}
                >
                  {sedes.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </TextField>
  
                <Typography variant="body2" fontWeight="medium">Compromiso:</Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={form.compromiso}
                  onChange={handleChange("compromiso")}
                  placeholder="Descripción breve del acuerdo"
                />
  
                <Typography variant="body2" fontWeight="medium">Responsable 1:</Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={form.responsable1}
                  onChange={handleChange("responsable1")}
                  placeholder="Nombre / área"
                />
  
                <Typography variant="body2" fontWeight="medium">Responsable 2:</Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={form.responsable2}
                  onChange={handleChange("responsable2")}
                  placeholder="Opcional"
                />
  
                <Typography variant="body2" fontWeight="medium">Fecha de Seguimiento:</Typography>
                <TextField
                  type="date"
                  fullWidth
                  size="small"
                  value={form.fechaSeguimiento}
                  onChange={handleChange("fechaSeguimiento")}
                  InputLabelProps={{ shrink: true }}
                />
  
                <Typography variant="body2" fontWeight="medium">Estado:</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={form.estado}
                  onChange={handleChange("estado")}
                >
                  {estados.map((e) => (
                    <MenuItem key={e} value={e}>{e}</MenuItem>
                  ))}
                </TextField>
  
                <Typography variant="body2" fontWeight="medium">Plazo:</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={form.plazo}
                  onChange={handleChange("plazo")}
                >
                  {plazos.map((p) => (
                    <MenuItem key={p} value={p}>{p}</MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>
  
            {/* Sección Acción y Observaciones */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Acción Realizada y Observaciones
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" fontWeight="medium" gutterBottom>
                  Acción Realizada:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={8}
                  placeholder="Describe aquí la acción realizada..."
                  value={form.accionRealizada}
                  onChange={handleChange("accionRealizada")}
                />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight="medium" gutterBottom>
                  Observaciones:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  placeholder="Comentarios adicionales"
                  value={form.observaciones}
                  onChange={handleChange("observaciones")}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
  
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Crear Acuerdo
          </Button>
        </DialogActions>
      </Dialog>
    );
}  