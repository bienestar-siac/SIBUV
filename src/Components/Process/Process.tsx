"use client"
// React
import type React from "react"
import { useState, useMemo } from "react";

// Material IU
import {
  Box,
  Grid,
  Typography,
} from "@mui/material"

// Redux
import { useSelector } from "react-redux";

// Components
import ServicioCard from './Card/ServiceCard'

// Styles
import styles from './styles'

export default function ModuleProcess() {
  const servicios = useSelector((state) => state.process.data);

  if (servicios?.length <= 0)
    return (
      <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography sx={{ display: 'grid', placeContent: 'center'}} variant="h6">
             Cargando Procesos...
          </Typography>
      </Box>
    )

  return (
    <Box sx={styles.contProcess}>
      <Grid container spacing={3}>
        {servicios.map((servicio, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ServicioCard
                titulo={servicio.proceso} 
                data={servicio} 
                icono={servicio.id} 
                color={servicio.color} 
                disabled={servicio.desativado === 'TRUE'} 
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}