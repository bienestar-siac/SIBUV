"use client"

import { Grid, TextField, Typography } from "@mui/material"

export default function InformacionGeneral() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Áreas Administrativas
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Nombre de la Universidad"
          defaultValue="Universidad del Valle"
          variant="outlined"
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Nombre de la Vicerrectoría"
          defaultValue="Bienestar Universitario"
          variant="outlined"
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Coordinador"
          placeholder="Ej: Adriana Reyes Torres"
          variant="outlined"
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Jefe de sección"
          placeholder="Ej: Patricia Andrea Martos"
          variant="outlined"
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Fecha de elaboración"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Periodo del informe"
          placeholder="Ej: Enero - Junio 2025"
          variant="outlined"
          margin="normal"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Objetivo del informe"
          multiline
          rows={3}
          placeholder="Describa el objetivo principal de este informe"
          variant="outlined"
          margin="normal"
        />
      </Grid>
    </Grid>
  )
}

