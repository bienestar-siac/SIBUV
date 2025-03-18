"use client"

import { Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material"

export default function SeccionesBienestar() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Secciones de Bienestar Universitario
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Sección a reportar</InputLabel>
          <Select label="Sección a reportar" defaultValue="">
            <MenuItem value="salud_ocupacional">Sección Salud Ocupacional</MenuItem>
            <MenuItem value="servicio_psicologico">Sección Servicio Psicológico</MenuItem>
            <MenuItem value="restaurante">Sección Restaurante Universitario</MenuItem>
            <MenuItem value="deporte">Sección Deporte y Recreación</MenuItem>
            <MenuItem value="desarrollo_humano">Sección Desarrollo Humano y Promoción Socioeconómica</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Jefe de sección"
          placeholder="Nombre del jefe de sección"
          variant="outlined"
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Iniciativas principales"
          placeholder="Describa las iniciativas principales"
          variant="outlined"
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Planes en ejecución"
          placeholder="Describa los planes en ejecución"
          variant="outlined"
          margin="normal"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Logros y resultados"
          multiline
          rows={3}
          placeholder="Describa los logros y resultados obtenidos"
          variant="outlined"
          margin="normal"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Desafíos y oportunidades de mejora"
          multiline
          rows={3}
          placeholder="Describa los desafíos enfrentados y oportunidades de mejora"
          variant="outlined"
          margin="normal"
        />
      </Grid>
    </Grid>
  )
}

