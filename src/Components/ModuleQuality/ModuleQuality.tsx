import type React from "react"
import { Fragment } from "react"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Box,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  LinearProgress,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  useTheme,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material"
import { AccountCircle, Visibility, Close } from "@mui/icons-material"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function Quality() {
  const [tabValue, setTabValue] = useState(0)
  const [oportunidad, setOportunidad] = useState("")
  const [indicador, setIndicador] = useState("")
  const [formula, setFormula] = useState("")
  const [progress, setProgress] = useState(60)
  const [modalAbierto, setModalAbierto] = useState(false);
  const theme = useTheme()
    const activities = [
        { id: 1, nombre: 'Actividad 1', descripcion: 'Descripción de la actividad 1' },
        { id: 2, nombre: 'Actividad 2', descripcion: 'Descripción de la actividad 2' },
        { id: 3, nombre: 'Actividad 3', descripcion: 'Descripción de la actividad 3' },
    ];

  const tasks = [
    { id: 101, name: 'Tarea 1', activityId: 1 },
    { id: 102, name: 'Tarea 2', activityId: 1 },
    { id: 103, name: 'Tarea 3', activityId: 1 },
    { id: 104, name: 'Tarea 4', activityId: 1 },
    { id: 105, name: 'Tarea 5', activityId: 1 },
    { id: 106, name: 'Tarea 6', activityId: 2 },
    { id: 107, name: 'Tarea 7', activityId: 2 },
    { id: 108, name: 'Tarea 8', activityId: 2 },
    { id: 109, name: 'Tarea 9', activityId: 3 },
    { id: 110, name: 'Tarea 10', activityId: 3 },
    { id: 111, name: 'Tarea 11', activityId: 3 },
  ];
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [visibleTasks, setVisibleTasks] = useState(5);

  // Filtra las tareas que correspondan a la actividad seleccionada
  const filteredTasks = selectedActivity
    ? tasks.filter(task => task.activityId === selectedActivity.id)
    : [];

  // Función para cargar 5 tareas más
  const handleLoadMore = () => {
    setVisibleTasks(prev => prev + 5);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleAbrirModal = () => {
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
  };

  return (
    <Fragment>
      <Container 
        sx={{ 
            width: '100%', 
            '@media (min-width: 1200px)': {
                maxWidth: '100% !important',
                padding: 'unset',
            }
        }}>
        <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden", width: '100%' }}>
        <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="acreditacion tabs"
            sx={{
                "& .MuiTabs-indicator": {
                display: "none",
                },
                ".MuiTabs-flexContainer": {
                borderBottom: "1px solid #ccc",
                },
                maxHeight: 40
            }}
            >
            <Tab
                label={
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="subtitle2" fontWeight="bold" color={tabValue === 0 ? "white" : "black"}>
                        Acreditación Institucional
                        </Typography>
                    </Box>
                }
                sx={{
                    backgroundColor: tabValue === 0 ? "#5e5e5e" : "#e0e0e0",
                    color: tabValue === 0 ? "white" : "black",
                    height: 40,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderRight: "1px solid #ccc",
                    overflow: "hidden",
                    "&.Mui-selected": {
                        color: "white",
                    },
                }}
            />
            <Tab
                label={
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="subtitle2" fontWeight="bold" color={tabValue === 1 ? "white" : "black"}>
                            Acreditación en Alta Calidad
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ fontSize: '10px'}} color={tabValue === 1 ? "white" : "black"}>
                            de programas académicos
                        </Typography>
                    </Box>
                }
                sx={{
                    backgroundColor: tabValue === 1 ? "#5e5e5e" : "#e0e0e0",
                    color: tabValue === 1 ? "white" : "red",
                    minHeight: 40,
                    borderTopRightRadius: 5,
                    overflow: 'hidden',
                    borderBottomRightRadius: 5,
                    "&.Mui-selected": {
                        color: "white",
                    },
                }}
            />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
            <Card variant="outlined" sx={{ mb: 4, borderRadius: 2 }}>
                <CardHeader
                    title={
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            Información Básica
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Detalles fundamentales de la acreditacion
                        </Typography>
                    </Box>
                    }
                    sx={{ pb: 0 }}
                />
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            mb: 3,
                            flexDirection: { xs: "column", md: "row" },
                        }}
                    >
                    <FormControl fullWidth sx={{ flex: 1, minWidth: 240, height: 40 }}>
                    <InputLabel id="oportunidad-label">Oportunidad de Mejora</InputLabel>
                    <Select
                        labelId="oportunidad-label"
                        value={oportunidad}
                        label="Oportunidad de Mejora"
                        onChange={(e) => setOportunidad(e.target.value)}
                        sx={{ height: 50 }}
                    >
                        <MenuItem value="oportunidad1">Mejorar procesos académicos</MenuItem>
                        <MenuItem value="oportunidad2">Actualizar infraestructura</MenuItem>
                        <MenuItem value="oportunidad3">Fortalecer investigación</MenuItem>
                    </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ flex: 1, minWidth: 240, height: 40 }}>
                    <InputLabel id="indicador-label">Indicador</InputLabel>
                    <Select
                        labelId="indicador-label"
                        value={indicador}
                        label="Indicador"
                        onChange={(e) => setIndicador(e.target.value)}
                        sx={{ height: 50 }}
                    >
                        <MenuItem value="indicador1">Tasa de graduación</MenuItem>
                        <MenuItem value="indicador2">Publicaciones científicas</MenuItem>
                        <MenuItem value="indicador3">Satisfacción estudiantil</MenuItem>
                    </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ flex: 1, minWidth: 240, height: 40 }}>
                    <TextField
                        disabled
                        label="Fórmula del Indicador"
                        variant="outlined"
                        value={formula}
                        onChange={(e) => setFormula(e.target.value)}
                        InputProps={{
                        sx: {
                            height: 50
                        }
                        }}
                    />
                    </FormControl>

                    <Box sx={{ flex: 1, minWidth: 240 }}>
                        <Typography variant="body2" gutterBottom>
                        Avance
                        </Typography>
                        <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: "#e0e0e0",
                            "& .MuiLinearProgress-bar": {
                            backgroundColor: "#d32f2f",
                            },
                        }}
                        />
                    </Box>
                    </Box>
                    </CardContent>
                </Card>

                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardHeader
                        title={
                            <Typography variant="h6" fontWeight="bold">
                            Actividad
                            </Typography>
                        }
                        action={
                            <Button
                            variant="contained"
                            startIcon={<Visibility />}
                            onClick={handleAbrirModal}
                            sx={{ backgroundColor: "#d32f2f", "&:hover": { backgroundColor: "#b71c1c" } }}
                            >
                            Ver Resultado
                            </Button>
                        }
                    />
                    <CardContent>
                      {/* Autocomplete para seleccionar actividad con búsqueda */}
                        <Autocomplete
                            options={activities}
                            getOptionLabel={(option) => option.nombre}
                            renderInput={(params) => (
                            <TextField {...params} label="Descripción de actividad" variant="outlined" fullWidth sx={{ mb: 3 }} />
                            )}
                            onChange={(event, newValue) => {
                            setSelectedActivity(newValue);
                            setVisibleTasks(5); // Reinicia el límite de tareas al cambiar de actividad
                            }}
                        />

                        {/* Solo se muestran las tareas si se seleccionó una actividad */}
                        {selectedActivity && (
                            <>
                            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                                Tareas para: {selectedActivity.nombre}
                            </Typography>
                            <Table>
                                <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nombre de la Tarea</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {filteredTasks.slice(0, visibleTasks).map(task => (
                                    <TableRow key={task.id}>
                                    <TableCell>{task.id}</TableCell>
                                    <TableCell>{task.name}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            {/* Botón para cargar más tareas si existen */}
                            {visibleTasks < filteredTasks.length && (
                                <Button onClick={handleLoadMore} sx={{ mt: 1 }}>
                                Cargar más tareas
                                </Button>
                            )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h6">Contenido de Acreditación en Alta Calidad</Typography>
                <Typography variant="body2" color="text.secondary">
                Esta sección está en desarrollo
                </Typography>
            </Box>
            </TabPanel>
        </Paper>
      </Container>
      <DetallesActividadModal
        open={modalAbierto}
        handleClose={handleCerrarModal}
        actividad={selectedActivity}
      />
    </Fragment>
  )
}

const DetallesActividadModal = ({ open, handleClose, actividad }) => {
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Detalles de la Actividad
          <IconButton
            aria-label="cerrar"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {/* Aquí puedes mostrar la información de la actividad */}
            {actividad ? (
              <>
                <strong>Nombre:</strong> {actividad.nombre}
                <br />
                <strong>Descripción:</strong> {actividad.descripcion}
                {/* Agrega más campos según necesites */}
              </>
            ) : (
              'No hay actividad seleccionada'
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };