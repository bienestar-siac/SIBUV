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
    Snackbar,
    Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect, Fragment } from "react";
import { getViewDataProcess } from "../../../services/process/decryptdata"
import { createAgreements } from "../../../services/process/Process"

const SPREEDSHEETID = import.meta.env.VITE_SPREEDSHEETID_AGREEMENTS;

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

const requiredFields = [
    'origen',
    'sede',
    'compromiso',
    'responsable1',
    'fechaSeguimiento',
    'estado',
    'plazo',
];
  
export default function CreatePopUpAgreements({ open, onClose, onCreate, sedes, estados, plazos }) {
    const [form, setForm] = useState(DEFAULT_VALUES);
    const [origin, setOrigin] = useState(null)
    const [responsability, setResponsability] = useState(null)
    const [status, setStatus] = useState({ open: false, type: 'success', message: '' });
    const [disabled, setDisabled] = useState(false);

    const handleChange = (field) => (e) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

    const handleSubmit = async () => {
        setDisabled(true)
        setStatus({ open: true, type: 'info', message: 'Enviando...' });
        try {
            const save = await createAgreements({
                sheet_name: "CONSOLIDADO",
                spreadsheet_id: SPREEDSHEETID,
                sedes_nodos: form.sede,
                compromisos: form.compromiso,
                responsable_1: form.responsable1,
                responsable_2: form.responsable2,
                accion: form.accionRealizada,
                fecha_seguimiento: form.fechaSeguimiento,
                estado: form.estado,
                plazo: form.plazo,
                observaciones: form.observaciones,
                origen: form?.origen,
            });
            if (save?.message) {
                setStatus({ open: true, type: 'success', message: 'Acuerdo creado exitosamente' });
                setDisabled(false)
                setForm(DEFAULT_VALUES);
            } else {
                setStatus({ open: true, type: 'error', message: "Error al guardar" });
                setDisabled(false)
            }
        } catch (err) {
            setStatus({ open: true, type: 'error', message: err.message });
        }
        setDisabled(false)
    };
  
    const init = async () => {
      const response = await getViewDataProcess({
          "sheet_name": "ORIGEN",
          "spreadsheet_id": SPREEDSHEETID,
      })
      const responsabilityData = await getViewDataProcess({
          "sheet_name": "Responsables",
          "spreadsheet_id": SPREEDSHEETID,
      })
      setOrigin(response?.slice(1))
      setResponsability(responsabilityData?.slice(1))
    }

    const handleCloseStatus = () => {
        setStatus((s) => ({ ...s, open: false }));
    };

    const isValid = requiredFields.every((field) => form[field] && form[field].toString().trim() !== '');

    useEffect(() => {
      if (origin === null) init()
    },[origin])

    return (
      <Fragment>
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
                      select
                      fullWidth
                      size="small"
                      value={form.origen}
                      onChange={handleChange("origen")}
                      label="Selecione el origen"
                      disabled={!origin}
                  >
                      <MenuItem value="">Seleccionar...</MenuItem>
                      {origin?.map((o, index) => (
                          <MenuItem key={index} value={o?.origen}>{o?.origen}</MenuItem>
                      ))}
                  </TextField>
    
                  <Typography variant="body2" fontWeight="medium">Sede:</Typography>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={form.sede}
                    label="Selecione la sede"
                    onChange={handleChange("sede")}
                  >
                    <MenuItem value="">Seleccionar...</MenuItem>
                    {sedes.map((s) => (
                      <MenuItem key={s} value={s}>{s}</MenuItem>
                    ))}
                  </TextField>
    
                  <Typography variant="body2" fontWeight="medium">Compromiso:</Typography>
                  <TextField
                    fullWidth
                    value={form.compromiso}
                    onChange={handleChange("compromiso")}
                    placeholder="Descripción breve del acuerdo"
                    multiline
                    minRows={4}
                    maxRows={8}
                  />
    
                  <Typography variant="body2" fontWeight="medium">Responsable 1:</Typography>
                  <TextField
                      select
                      label="Responsable 1"
                      fullWidth
                      size="small"
                      value={form.responsable1}
                      onChange={handleChange("responsable1")}
                      disabled={!responsability}
                  >
                      <MenuItem value="">Seleccionar...</MenuItem>
                      {responsability?.map((r, i) => {
                          return (
                              <MenuItem key={i} value={r?.responsable}>
                                  {r?.responsable}
                              </MenuItem>
                          );
                      })}
                  </TextField>
    
                  <Typography variant="body2" fontWeight="medium">Responsable 2:</Typography>
                  <TextField
                      select
                      label="Responsable 2"
                      fullWidth
                      size="small"
                      value={form.responsable2}
                      onChange={handleChange("responsable2")}
                      disabled={!responsability}
                  >
                      <MenuItem value="">Seleccionar...</MenuItem>
                      {responsability?.map((r, i) => {
                          return (
                              <MenuItem key={i} value={r?.responsable}>
                                  {r?.responsable}
                              </MenuItem>
                          );
                      })}
                  </TextField>
    
                  <Typography variant="body2" fontWeight="medium">Fecha de Seguimiento:</Typography>
                  <TextField
                    type="date"
                    fullWidth
                    value={form.fechaSeguimiento}
                    onChange={handleChange("fechaSeguimiento")}
                    InputLabelProps={{ shrink: true }}
                    sx={{ '> div': { height: '40px'}}}
                  />
    
                  <Typography variant="body2" fontWeight="medium">Estado:</Typography>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={form.estado}
                    label="Selecione el Estado"
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
                    label="Selecione el Plazo"
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
            <Button disabled={disabled} onClick={onClose}>Cancelar</Button>
            <Button 
              disabled={!isValid || disabled} 
              sx={{ background: '#eb3e26' }} 
              variant="contained" 
              onClick={handleSubmit}>
              Crear Acuerdo
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={status.open} autoHideDuration={4000} onClose={handleCloseStatus}>
          <Alert severity={status.type} onClose={handleCloseStatus} sx={{ width: '100%' }}>
              {status.message}
          </Alert>
        </Snackbar>
      </Fragment>
    );
}  