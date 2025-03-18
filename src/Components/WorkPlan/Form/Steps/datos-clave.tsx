"use client"

import { Grid, TextField, Typography } from "@mui/material"

export default function DatosClave() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Datos Clave sobre Bienestar Universitario
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Cantidad de almuerzos subsidiados"
          placeholder="Ej: 5,500 diarios"
          variant="outlined"
          margin="normal"
          type="number"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Cantidad de usuarios del Servicio de Salud"
          placeholder="Ej: 6,000"
          variant="outlined"
          margin="normal"
          type="number"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Estudiantes beneficiados con apoyo económico"
          placeholder="Ej: 3,000 monitores"
          variant="outlined"
          margin="normal"
          type="number"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Víctimas del conflicto armado atendidas"
          placeholder="Ingrese la cantidad"
          variant="outlined"
          margin="normal"
          type="number"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Personas atendidas en salud mental"
          placeholder="Ej: 55"
          variant="outlined"
          margin="normal"
          type="number"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Proyectos de inversión"
          placeholder="Códigos de proyectos (Ej: 02923, 03023)"
          variant="outlined"
          margin="normal"
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          Proyectos de Inversión y Planes de Mejoramiento
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Nombre del proyecto"
          placeholder="Nombre del proyecto de inversión"
          variant="outlined"
          margin="normal"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField fullWidth label="Código del proyecto" placeholder="Ej: 02923" variant="outlined" margin="normal" />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Descripción del proyecto"
          multiline
          rows={3}
          placeholder="Describa el proyecto de inversión"
          variant="outlined"
          margin="normal"
        />
      </Grid>
    </Grid>
  )
}

