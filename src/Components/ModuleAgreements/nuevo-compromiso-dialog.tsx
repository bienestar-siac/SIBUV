"use client"

import { useState } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface NuevoCompromisoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NuevoCompromisoDialog({ open, onOpenChange }: NuevoCompromisoDialogProps) {
  const [fecha, setFecha] = useState<Date | null>(null)
  const [estado, setEstado] = useState("")
  const [sede, setSede] = useState("")
  const [responsable, setResponsable] = useState("")
  const [plazo, setPlazo] = useState("")

  const handleClose = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Nuevo Compromiso</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 3 }}>Complete los detalles del nuevo compromiso o acuerdo.</DialogContentText>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="actividad"
              label="Actividad"
              type="text"
              fullWidth
              variant="outlined"
              placeholder="Título de la actividad"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha"
                value={fecha}
                onChange={(newValue) => setFecha(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                id="estado"
                value={estado}
                label="Estado"
                onChange={(e) => setEstado(e.target.value)}
              >
                <MenuItem value="EN EJECUCIÓN">En ejecución</MenuItem>
                <MenuItem value="PENDIENTE">Pendiente</MenuItem>
                <MenuItem value="FINALIZADO">Finalizado</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="sede-label">Sede/Nodo</InputLabel>
              <Select
                labelId="sede-label"
                id="sede"
                value={sede}
                label="Sede/Nodo"
                onChange={(e) => setSede(e.target.value)}
              >
                <MenuItem value="BUGA">BUGA</MenuItem>
                <MenuItem value="CALI">CALI</MenuItem>
                <MenuItem value="PALMIRA">PALMIRA</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="responsable-label">Responsable</InputLabel>
              <Select
                labelId="responsable-label"
                id="responsable"
                value={responsable}
                label="Responsable"
                onChange={(e) => setResponsable(e.target.value)}
              >
                <MenuItem value="Juan Pérez">Juan Pérez</MenuItem>
                <MenuItem value="María López">María López</MenuItem>
                <MenuItem value="Carlos Rodríguez">Carlos Rodríguez</MenuItem>
                <MenuItem value="Ana Martínez">Ana Martínez</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="plazo-label">Plazo</InputLabel>
              <Select
                labelId="plazo-label"
                id="plazo"
                value={plazo}
                label="Plazo"
                onChange={(e) => setPlazo(e.target.value)}
              >
                <MenuItem value="CORTO">Corto</MenuItem>
                <MenuItem value="MEDIANO">Mediano</MenuItem>
                <MenuItem value="LARGO">Largo</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="detalles"
              label="Detalles"
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              placeholder="Detalles del compromiso"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="observaciones"
              label="Observaciones"
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              placeholder="Observaciones adicionales"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancelar
        </Button>
        <Button onClick={handleClose} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
