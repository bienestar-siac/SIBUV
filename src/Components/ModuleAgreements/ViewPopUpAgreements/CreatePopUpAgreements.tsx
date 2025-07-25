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
    Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect, Fragment } from "react";
import { getViewDataProcess } from "../../../services/process/decryptdata"
import { createAgreements, updateAgreements} from "../../../services/process/Process"

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
  
export default function CreatePopUpAgreements({ 
  open,
  onClose, 
  onCreate, 
  sedes, 
  estados, 
  plazos, 
  defaultValues,
  setDefaultValues,
}) {
    const [form, setForm] = useState(DEFAULT_VALUES);
    const [origin, setOrigin] = useState(null)
    const [responsability, setResponsability] = useState(null)
    const [status, setStatus] = useState({ open: false, type: 'success', message: '' });
    const [disabled, setDisabled] = useState(false);

    const handleChange = (field) => (e) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

    const handlerCloseDialog = () => {
      setForm(DEFAULT_VALUES)
      setDefaultValues(null)
      onClose()
    }

    const handleSubmit = async () => {
        setDisabled(true)
        setStatus({ open: true, type: 'info', message: 'Enviando...' });
        try {
            const body = {
                sheet_name: "CONSOLIDADO",
                spreadsheet_id: SPREEDSHEETID,
                sedes_nodos: form.sede,
                compromisos: form.compromiso,
                responsable_1: form.responsable1,
                responsable_2: form.responsable2,
                accion: form.accionRealizada,
                fecha_seguimiento: (() => {
                  const [year, month, day] = form.fechaSeguimiento.split('-');
                  return `${day}-${month}-${year}`;
                })(),
                estado: form.estado,
                plazo: form.plazo,
                observaciones: form.observaciones,
                origen: form?.origen,
                row_number: defaultValues?.row_number
            }

            let save = null
            if (!defaultValues)
                save = await createAgreements(body);

            if (defaultValues) 
                save = await updateAgreements(body);
            console.log(save," S A V E")
            if (save?.message) {
                setStatus({ open: true, type: 'success', message: 'Acuerdo creado exitosamente' });
                setDisabled(false)
                if (!defaultValues) setForm(DEFAULT_VALUES);
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

    useEffect(() => {
      if (!defaultValues) return

      let fs = "";
      const raw = defaultValues?.["fecha de seguimiento"];
      if (raw) {
        const [dd, mm, yyyy] = raw.split("-");
        fs = `${yyyy}-${mm?.padStart(2, "0")}-${dd?.padStart(2, "0")}`;
      }

      setForm({
        origen: defaultValues?.origen || "",
        sede: defaultValues?.["sedes/nodos"] || "",
        compromiso: defaultValues?.["compromisos / acuerdos"] || "",
        responsable1: defaultValues?.["responsable 1"] || "",
        responsable2: defaultValues?.["responsable 2"] || "",
        fechaSeguimiento: fs,
        estado: defaultValues?.estado || "",
        plazo: defaultValues?.["plazo de ejecución"] || "",
        accionRealizada: defaultValues?.["acción realizada"] || "",
        observaciones: defaultValues?.observaciones || "",
      });
      setDisabled(false)
      console.log(defaultValues?.row_number)
    },[defaultValues])

    return (
      <Fragment>
        <Dialog open={open} onClose={handlerCloseDialog} fullWidth maxWidth="md">
          <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
            { defaultValues === null ? "Nuevo Acuerdo" : "Actualizar Acuerdo"}
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
                  <Autocomplete
                    disabled={!origin || origin.length === 0}
                    size="small"
                    fullWidth
                    options={origin || []}
                    getOptionLabel={(opt) => opt.origen}
                    value={
                      origin?.find((o) => o.origen === form.origen) || null
                    }
                    onChange={(_e, newValue) => {
                      handleChange("origen")({
                        target: { value: newValue?.origen || "" },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Seleccione el origen"
                        placeholder="Busca o selecciona..."
                      />
                    )}
                  />
    
                  <Typography variant="body2" fontWeight="medium">Sede:</Typography>
                  <Autocomplete
                    disabled={!sedes || sedes.length === 0}
                    size="small"
                    fullWidth
                    options={sedes || []}
                    getOptionLabel={(opt) => opt}
                    value={form.sede || null}
                    onChange={(_e, newValue) => {
                      handleChange("sede")({
                        target: { value: newValue || "" },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Seleccione la sede"
                        placeholder="Busca o selecciona..."
                      />
                    )}
                  />

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
                  <Autocomplete
                    disabled={!responsability || responsability.length === 0}
                    size="small"
                    fullWidth
                    options={responsability || []}
                    getOptionLabel={(opt) => opt.responsable}
                    value={
                      responsability?.find((r) => r.responsable === form.responsable1) || null
                    }
                    onChange={(_e, newValue) => {
                      handleChange("responsable1")({
                        target: { value: newValue?.responsable || "" },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Responsable 1"
                        placeholder="Busca o selecciona..."
                      />
                    )}
                  />

                  <Typography variant="body2" fontWeight="medium">Responsable 2:</Typography>
                  <Autocomplete
                    disabled={!responsability || responsability.length === 0}
                    size="small"
                    fullWidth
                    options={responsability || []}
                    getOptionLabel={(opt) => opt.responsable}
                    value={
                      responsability?.find((r) => r.responsable === form.responsable2) || null
                    }
                    onChange={(_e, newValue) => {
                      handleChange("responsable2")({
                        target: { value: newValue?.responsable || "" },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Responsable 2"
                        placeholder="Busca o selecciona..."
                      />
                    )}
                  />
    
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
            <Button disabled={disabled} onClick={handlerCloseDialog}>Cancelar</Button>
            <Button 
              disabled={!isValid || disabled} 
              sx={{ background: '#eb3e26' }} 
              variant="contained" 
              onClick={handleSubmit}>
              { defaultValues === null ? "Crear Acuerdo" : "Actualizar Acuerdo"}
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