"use client"

// React
import React, { useState } from "react"

// Material UI
import { Grid, TextField, Snackbar, Alert } from "@mui/material"

// Styles
import Styles from "../../styles"

// Fetchs
import { updateDataProcessTask } from "../../../../services/process/Process"

export default function Components({ fields }) {
  const [loadingMap, setLoadingMap] = useState({})
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  const handleBlur = async (e, fieldId,originalValue) => {
    const newValue = e.target.value
    if (newValue === originalValue) return

    setLoadingMap((prev) => ({ ...prev, [fieldId]: true }))
    try {
      const response = await updateDataProcessTask(
        {
          sheet_name: "INFORME",
          id: fieldId,
          valor: e.target.value,
        },
        "updateValueForm"
      )

      if (response?.message) {
        setSnackbar({
          open: true,
          message: "¡Actualización exitosa!",
          severity: "success",
        })
      } else {
        setSnackbar({
          open: true,
          message: "Error en la actualización.",
          severity: "error",
        })
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error en la actualización.",
        severity: "error",
      })
    } finally {
      setLoadingMap((prev) => ({ ...prev, [fieldId]: false }))
    }
  }

  if (!fields || fields.length <= 0)
    return <h3>No hay Elementos para esta categoria</h3>

  return (
    <>
      <Grid container spacing={3}>
        {fields.map((field) => {
          const fieldType = field.tipo.toLowerCase()

          const commonProps = {
            fullWidth: true,
            label: field?.nombre_variable,
            defaultValue: field?.valor,
            variant: "outlined",
            margin: "normal",
            sx: Styles.FieldText,
            disabled: loadingMap[field.id] || false,
            onBlur: (e) => handleBlur(e, field.id, field.valor),
          }

          if (fieldType === "text") {
            return (
              <Grid item xs={12} md={6} key={field.id}>
                <TextField {...commonProps} />
              </Grid>
            )
          } else if (fieldType === "date") {
            return (
              <Grid item xs={12} md={6} key={field.id}>
                <TextField
                  {...commonProps}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            )
          } else {
            return (
              <Grid item xs={12} md={6} key={field.id}>
                <TextField {...commonProps} />
              </Grid>
            )
          }
        })}
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() =>
          setSnackbar((prev) => ({ ...prev, open: false }))
        }
      >
        <Alert
          onClose={() =>
            setSnackbar((prev) => ({ ...prev, open: false }))
          }
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
