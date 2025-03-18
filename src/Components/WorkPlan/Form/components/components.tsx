"use client"

// React
import React from "react"

// Material IU
import { Grid, TextField } from "@mui/material"

// Styles
import Styles from '../../styles'

/**
 * Components
 */
export default function Components({ fields }) {
  if (fields?.length <= 0) return (
    <h3>No hay Elementos para esta categoria</h3>
  )

  return (
    <Grid container spacing={3}>
      {fields.map((field) => {

        const fieldType = field.tipo.toLowerCase()

        if (fieldType === "text") {
          return (
            <Grid item xs={12} md={6} key={field.id}>
              <TextField
                fullWidth
                label={field?.nombre_variable}
                defaultValue={field?.valor}
                variant="outlined"
                margin="normal"
                sx={Styles.FieldText}
              />
            </Grid>
          )
        } else if (fieldType === "date") {
          return (
            <Grid item xs={12} md={6} key={field.id}>
              <TextField
                fullWidth
                label={field?.nombre_variable}
                type="date"
                defaultValue={field?.valor}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                margin="normal"
                sx={Styles.FieldText}
              />
            </Grid>
          )
        } else {
          return (
            <Grid item xs={12} md={6} key={field.id}>
              <TextField
                fullWidth
                label={field.nombre_variable}
                defaultValue={field.valor}
                variant="outlined"
                margin="normal"
                sx={Styles.FieldText}
              />
            </Grid>
          )
        }
      })}
    </Grid>
  )
}