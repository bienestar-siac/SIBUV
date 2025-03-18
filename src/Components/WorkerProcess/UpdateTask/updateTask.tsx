"use client"

// React
import { useState } from "react"
import { useParams } from 'react-router-dom'

// Material UI
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Box,
  Snackbar,
  Alert,
  Autocomplete
} from "@mui/material"

// Redux
import { useSelector } from "react-redux"

// Fetch 
import { updateDataProcessTask } from '../../../services/process/Process'

/**
 * Update Task
 */
export default function UpdateTask({ open, setOpen }) {
  // Params
  const { route } = useParams()

  // Obtener todas las tareas
  const actividades = useSelector((state) => state.viewProcess.taskList)

  // Generar arreglo único de actividades (como string)
  const uniqueActivityOptions = Array.from(new Set(actividades.map(item => item?.actividad)))

  // Estados del formulario
  const [selectedActivity, setSelectedActivity] = useState("")
  // Para la tarea, usamos un objeto o null
  const [selectedTask, setSelectedTask] = useState(null)
  // Estado inicial de la tarea
  const [estado, setEstado] = useState("Pendiente")
  const [descripcion, setDescripcion] = useState("")

  // Estados para el botón de loading y mensajes
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  // Manejadores de eventos
  const handleClose = () => {
    setOpen(false)
    // Resetear el formulario
    setSelectedActivity("")
    setSelectedTask(null)
    setEstado("Pendiente")
    setDescripcion("")
  }

  const capitalizedText = (text: string) => {
    return text
      ?.split("-")
      ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
      ?.join(" ")
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await updateDataProcessTask({
        "sheet_name": capitalizedText(route),
        "id": Number(selectedTask?.id || 0),
        "estado": estado,
        "detalles_seguimiento": descripcion || " "
      })

      if(response?.message) {
         setSnackbar({ open: true, message: "Actualización exitosa!", severity: "success" })
         handleClose() // Cierra el modal al ser correcto
      } else {
         setSnackbar({ open: true, message: "Error en la actualización.", severity: "error" })
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Error en la actualización.", severity: "error" })
    } finally {
      setLoading(false)
    }
  }

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // Filtrar las tareas según la actividad seleccionada
  const tareasDeActividad = selectedActivity
    ? actividades.filter((item) => item?.actividad === selectedActivity)
    : []

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Actualizar Avance de Tarea</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            {/* Autocomplete para seleccionar Actividad */}
            <FormControl fullWidth margin="normal">
              <Autocomplete
                options={uniqueActivityOptions}
                value={selectedActivity}
                onChange={(event, newValue) => {
                  setSelectedActivity(newValue || "")
                  // Limpiar la tarea al cambiar la actividad
                  setSelectedTask(null)
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Seleccionar Actividad" variant="outlined" />
                )}
                clearOnEscape
              />
            </FormControl>

            {/* Autocomplete para seleccionar Tarea (solo si hay actividad seleccionada) */}
            {selectedActivity && (
              <FormControl fullWidth margin="normal">
                <Autocomplete
                  options={tareasDeActividad}
                  value={selectedTask}
                  onChange={(event, newValue) => {
                    setSelectedTask(newValue)
                    if (newValue) {
                      setEstado(newValue.estado)
                      setDescripcion(newValue.detalles_seguimiento)
                    }
                  }}
                  getOptionLabel={(option) => option?.tarea || ""}
                  renderInput={(params) => (
                    <TextField {...params} label="Seleccionar Tarea" variant="outlined" />
                  )}
                  clearOnEscape
                />
              </FormControl>
            )}

            {/* Campos adicionales (visibles solo si hay tarea seleccionada) */}
            {selectedTask && (
              <>
                <FormControl component="fieldset" fullWidth margin="normal">
                  <Typography variant="subtitle1" gutterBottom>
                    Estado de la Tarea
                  </Typography>
                  <RadioGroup name="estado" value={estado} onChange={(event) => setEstado(event.target.value)}>
                    <FormControlLabel
                      value="Pendiente"
                      control={<Radio sx={{ color: "red", "&.Mui-checked": { color: "red" } }} />}
                      label="Pendiente"
                    />
                    <FormControlLabel
                      value="En Curso"
                      control={<Radio sx={{ color: "red", "&.Mui-checked": { color: "red" } }} />}
                      label="En Curso"
                    />
                    <FormControlLabel
                      value="Finalizada"
                      control={<Radio sx={{ color: "red", "&.Mui-checked": { color: "red" } }} />}
                      label="Finalizada"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl sx={{ marginTop: '40px' }} fullWidth margin="normal">
                  <TextField
                    label="Descripción de la Actualización del Seguimiento"
                    multiline
                    rows={4}
                    value={descripcion}
                    onChange={(event) => setDescripcion(event.target.value)}
                    placeholder="Ingrese detalles sobre la actualización de esta tarea..."
                  />
                </FormControl>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          { 
            !loading &&
            <Button onClick={handleClose} variant="outlined">
              Cancelar
            </Button>
          }
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading || !selectedTask || estado === "Pendiente"}
            style={{
              backgroundColor: selectedTask && estado !== "Pendiente" ? "#dc2626" : undefined,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Guardar Cambios"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
