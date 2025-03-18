"use client"

// React
import { useState } from "react"

// Material UI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Box,
} from "@mui/material"

// Redux
import { useSelector } from "react-redux"

export default function UpdateTask({ open, setOpen }) {
  // Estados
  let uniquesAvailables = []
  const actividades = useSelector((state) => state.viewProcess.taskList)
  const uniquetsActivies = actividades.filter((item) => {
    let cond = uniquesAvailables.includes(item?.actividad)
    if (!cond) uniquesAvailables.push(item?.actividad)
    return !cond
  })

  console.log(uniquetsActivies, "actividades")
  // Estados del formulario
  const [selectedActivity, setSelectedActivity] = useState("")
  const [selectedTask, setSelectedTask] = useState("")
  // Se asume que el estado inicial de la tarea es "pendiente"
  const [estado, setEstado] = useState("pendiente")
  const [descripcion, setDescripcion] = useState("")

  // Ejemplo de tareas (aunque en este caso no se utilizan para renderizar el selector de tareas)
  const tareas = {
    "1": [
      { id: "1-1", nombre: "Suministrar y organizar la información que se requiere" },
      { id: "1-2", nombre: "Realizar pruebas técnicas en la implementación del sistema" },
    ],
    "2": [
      { id: "2-1", nombre: "Diagnóstico en riesgo psicosocial de acuerdo a base" },
      { id: "2-2", nombre: "Realizar visitas a los puestos de trabajo" },
    ],
    "3": [
      { id: "3-1", nombre: "Realizar procesos de formación y capacitación a funcionarios" },
      { id: "3-2", nombre: "Realizar consulta individual con psicología ocupacional" },
    ],
  }

  // Manejadores de eventos
  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    // Resetear el formulario
    setSelectedActivity("")
    setSelectedTask("")
    setEstado("pendiente")
    setDescripcion("")
  }

  const handleActivityChange = (event) => {
    setSelectedActivity(event.target.value)
    setSelectedTask("")
  }

  const handleTaskChange = (event) => {
    setSelectedTask(event.target.value)
  }

  const handleEstadoChange = (event) => {
    setEstado(event.target.value)
  }

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value)
  }

  const handleSubmit = () => {
    // Aquí iría la lógica para guardar los cambios
    console.log({
      actividad: selectedActivity,
      tarea: selectedTask,
      estado,
      descripcion,
    })

    // Cerrar el diálogo y resetear
    handleClose()

    // Mostrar mensaje de éxito
    alert("Tarea actualizada correctamente")
  }

  // Obtener las tareas para la actividad seleccionada
  const tareasDeActividad =
    selectedActivity
      ? actividades.filter((item) => item?.actividad === selectedActivity) || []
      : []

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Actualizar Avance de Tarea</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            {/* Selector de Actividad */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Seleccionar Actividad</InputLabel>
              <Select
                value={selectedActivity}
                label="Seleccionar Actividad"
                onChange={handleActivityChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 500,
                    },
                  },
                }}
              >
                {uniquetsActivies.map((actividad) => (
                  <MenuItem
                    key={actividad.id}
                    value={actividad?.actividad}
                    sx={{
                      maxWidth: 500,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {actividad?.actividad}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Selector de Tarea (visible solo si hay actividad seleccionada) */}
            {selectedActivity && (
              <FormControl fullWidth margin="normal">
                <InputLabel>Seleccionar Tarea</InputLabel>
                <Select
                  value={selectedTask}
                  label="Seleccionar Tarea"
                  onChange={handleTaskChange}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 500,
                      },
                    },
                  }}
                >
                  {tareasDeActividad.map((tarea) => (
                    <MenuItem
                      key={tarea.id}
                      value={tarea?.id}
                      sx={{
                        maxWidth: 500,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {tarea?.tarea}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Campos adicionales (visibles solo si hay tarea seleccionada) */}
            {selectedTask && (
              <>
                <FormControl component="fieldset" fullWidth margin="normal">
                  <Typography variant="subtitle1" gutterBottom>
                    Estado de la Tarea
                  </Typography>
                  <RadioGroup name="estado" value={estado} onChange={handleEstadoChange}>
                    <FormControlLabel
                      value="pendiente"
                      control={<Radio sx={{ color: "red", "&.Mui-checked": { color: "red" } }} />}
                      label="Pendiente"
                    />
                    <FormControlLabel
                      value="en-proceso"
                      control={<Radio sx={{ color: "red", "&.Mui-checked": { color: "red" } }} />}
                      label="En Proceso"
                    />
                    <FormControlLabel
                      value="completada"
                      control={<Radio sx={{ color: "red", "&.Mui-checked": { color: "red" } }} />}
                      label="Completada"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl sx={{ marginTop: '40px'}} fullWidth margin="normal">
                  <TextField
                    label="Descripción de la Actualización del Seguimiento"
                    multiline
                    rows={4}
                    value={descripcion}
                    onChange={handleDescripcionChange}
                    placeholder="Ingrese detalles sobre la actualización de esta tarea..."
                  />
                </FormControl>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!selectedTask || estado === "pendiente"}
            style={{
              backgroundColor: selectedTask && estado !== "pendiente" ? "#dc2626" : undefined,
            }}
          >
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
