"use client"

import {
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material"

export default function ProgramasPoliticas() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Programas y Políticas Institucionales
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Política institucional</InputLabel>
          <Select label="Política institucional" defaultValue="">
            <MenuItem value="universidad_saludable">Política de Universidad Saludable</MenuItem>
            <MenuItem value="discapacidad_inclusion">Política de Discapacidad e Inclusión</MenuItem>
            <MenuItem value="igualdad_genero">Política de Igualdad y Equidad de Género</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Responsable de implementación"
          placeholder="Nombre del responsable"
          variant="outlined"
          margin="normal"
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
          Estado de implementación
        </Typography>

        <FormControlLabel control={<Checkbox />} label="Fase de diagnóstico" />

        <FormControlLabel control={<Checkbox />} label="Fase de planificación" />

        <FormControlLabel control={<Checkbox />} label="Fase de implementación" />

        <FormControlLabel control={<Checkbox />} label="Fase de evaluación" />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Fecha de inicio"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Fecha estimada de finalización"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          margin="normal"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Descripción de avances"
          multiline
          rows={3}
          placeholder="Describa los avances en la implementación de la política"
          variant="outlined"
          margin="normal"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Impacto esperado"
          multiline
          rows={3}
          placeholder="Describa el impacto esperado de la política"
          variant="outlined"
          margin="normal"
        />
      </Grid>
    </Grid>
  )
}

