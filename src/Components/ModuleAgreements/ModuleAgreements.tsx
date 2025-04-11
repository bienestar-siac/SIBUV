"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  AppBar,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  Pagination,
  Dialog, DialogTitle, DialogContent,
} from "@mui/material"
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Person as PersonIcon,
} from "@mui/icons-material"
import { LinearProgress } from "@mui/material"
import { CompromisosPorEstado } from "./compromisos-por-estado"
import { CompromisosPorPlazo } from "./compromisos-por-plazo"
import { CompromisosPorResponsable } from "./compromisos-por-responsable"
import { NuevoCompromisoDialog } from "./nuevo-compromiso-dialog"
import ChevronDownIcon from "@mui/icons-material/KeyboardArrowDown"; 
import CloseIcon from "@mui/icons-material/Close";

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

// Redux
import { useSelector } from "react-redux"

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, height: 300 }}>{children}</Box>}
    </div>
  )
}

export default function Dashboard() {
  const dataAgreementsPrimary = useSelector((state) => state.moduleAgreements.agreements);
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSede, setSelectedSede] = useState("TODAS LAS SEDES")
  const [selectedEstado, setSelectedEstado] = useState("todos")
  const [selectedResponsable, setSelectedResponsable] = useState("todos")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCompromiso, setSelectedCompromiso] = useState<any>(null)
  const [dataAgreements] = useState(dataAgreementsPrimary?.filter((item) => item?.estado !== undefined))
  const [tabValue, setTabValue] = useState(0)
  const [sedes, setSedes] = useState([])

  useEffect(() => {
    if (dataAgreements?.length) {
      const sedesUnicas = [...new Set(dataAgreements.map(item => item['sedes/nodos']))]
      setSedes(sedesUnicas)
    }
  }, [dataAgreements])

  console.log(sedes,"dataAgreements")

  // Filtrar compromisos según los criterios seleccionados
  const filteredCompromisos = dataAgreements.filter((compromiso) => {
    const matchesSede = selectedSede === "todas" || compromiso?.['sedes/nodos'] === selectedSede
    const matchesEstado = selectedEstado === "todos" || compromiso?.estado === selectedEstado
    const matchesResponsable = selectedResponsable === "todos" || compromiso?.['responsable 1'] === selectedResponsable
    const matchesSearch =
      searchQuery === "" ||
      compromiso.actividad.toLowerCase().includes(searchQuery.toLowerCase()) ||
      compromiso.detalles.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSede && matchesEstado && matchesResponsable
  })

  // Estadísticas para KPIs
// Para los KPIs: aplicar los filtros de sede y responsable, pero no el de estado (ya que queremos agrupar todos los estados)
const dataForKPI = dataAgreements.filter((compromiso) => {
    const matchesSede = selectedSede === "TODAS LAS SEDES" || compromiso?.['sedes/nodos'] === selectedSede;
    const matchesResponsable = selectedResponsable === "todos" || compromiso?.['responsable 1'] === selectedResponsable;
    return matchesSede
  });
  
  // Estadísticas para KPIs usando el array filtrado por sede y responsable
  const totalCompromisosFiltered = dataForKPI.length;
  const compromisosEnEjecucion = dataForKPI.filter((item) => item?.estado === "EN EJECUCIÓN").length;
  const compromisosPendientes = dataForKPI.filter((item) => item?.estado === "PENDIENTE").length;
  const compromisosFinalizados = dataForKPI.filter((item) => item?.estado === "CERRADO").length;
  
  // Porcentajes para Progress (asegurarte de que totalCompromisosFiltered no sea 0 para evitar NaN)
  const porcentajeEjecucion =
    totalCompromisosFiltered > 0
      ? (compromisosEnEjecucion / totalCompromisosFiltered) * 100
      : 0;
  const porcentajePendientes =
    totalCompromisosFiltered > 0
      ? (compromisosPendientes / totalCompromisosFiltered) * 100
      : 0;
  const porcentajeFinalizados =
    totalCompromisosFiltered > 0
      ? (compromisosFinalizados / totalCompromisosFiltered) * 100
      : 0;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const getEstadoChip = (estado: string) => {
    switch (estado) {
      case "FINALIZADO":
        return <Chip label={estado} color="success" />
      case "EN EJECUCIÓN":
        return <Chip label={estado} color="primary" />
      case "PENDIENTE":
        return <Chip label={estado} variant="outlined" />
      default:
        return <Chip label={estado} />
    }
  }

  const getPlazoChip = (plazo: string) => {
    switch (plazo) {
      case "CORTO":
        return <Chip label={plazo} variant="outlined" sx={{ color: "green", borderColor: "green" }} />
      case "MEDIANO":
        return <Chip label={plazo} variant="outlined" sx={{ color: "orange", borderColor: "orange" }} />
      case "LARGO":
        return <Chip label={plazo} variant="outlined" sx={{ color: "red", borderColor: "red" }} />
      default:
        return <Chip label={plazo} variant="outlined" />
    }
  }

  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = filteredCompromisos.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        <Container maxWidth="xl" sx={{ py: 3, flex: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Box>
              <Typography variant="h4" component="h2" fontWeight="bold">
                Seguimiento de Compromisos y Acuerdos
                {selectedSede === 'TODAS LAS SEDES'? '' : `- ${selectedSede}`}
              </Typography>
              <Typography color="text.secondary">
                {new Date().toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setIsDialogOpen(true)}>
                Nuevo Compromiso
              </Button>
              <Button variant="outlined" startIcon={<RefreshIcon />}>
                Actualizar
              </Button>
            </Box>
          </Box>

          {/* KPIs */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={3}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Compromisos
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {dataAgreements?.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Compromisos registrados
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  En Ejecución
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {compromisosEnEjecucion}
                </Typography>
                <LinearProgress variant="determinate" value={porcentajeEjecucion} sx={{ my: 1 }} />
                <Typography variant="caption" color="text.secondary">
                    {Number(((porcentajeEjecucion) * 100).toFixed(2))}% del total
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Pendientes
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                    {compromisosPendientes}
                </Typography>
                <LinearProgress variant="determinate" value={porcentajePendientes} sx={{ my: 1 }} />
                <Typography variant="caption" color="text.secondary">
                {(Number(porcentajePendientes).toFixed(2))}% del total
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Finalizados
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                    {compromisosFinalizados}
                </Typography>
                <LinearProgress variant="determinate" value={porcentajeFinalizados} sx={{ my: 1 }} color="success" />
                <Typography variant="caption" color="text.secondary">
                {(Number(porcentajeFinalizados).toFixed(2))}% del total
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            {/* Filtros */}
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Filtros
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <TextField
                    label="Buscar compromiso"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FormControl fullWidth>
                    <InputLabel id="sede-label">Sede/Nodo</InputLabel>
                    <Select
                      labelId="sede-label"
                      value={selectedSede}
                      label="Sede/Nodo"
                      onChange={(e) => setSelectedSede(e.target.value)}
                    >
                      <MenuItem value="todas">Todas las sedes</MenuItem>
                      {sedes.map((sede, index) => (
                            <MenuItem key={index} value={sede}>
                            {sede}
                        </MenuItem>
                     ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="estado-label">Estado</InputLabel>
                    <Select
                      labelId="estado-label"
                      value={selectedEstado}
                      label="Estado"
                      onChange={(e) => setSelectedEstado(e.target.value)}
                    >
                      <MenuItem value="todos">Todos los estados</MenuItem>
                      <MenuItem value="EN EJECUCIÓN">En ejecución</MenuItem>
                      <MenuItem value="PENDIENTE">Pendiente</MenuItem>
                      <MenuItem value="FINALIZADO">Finalizado</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="responsable-label">Responsable</InputLabel>
                    <Select
                      labelId="responsable-label"
                      value={selectedResponsable}
                      label="Responsable"
                      onChange={(e) => setSelectedResponsable(e.target.value)}
                    >
                      <MenuItem value="todos">Todos los responsables</MenuItem>
                      <MenuItem value="Juan Pérez">Juan Pérez</MenuItem>
                      <MenuItem value="María López">María López</MenuItem>
                      <MenuItem value="Carlos Rodríguez">Carlos Rodríguez</MenuItem>
                      <MenuItem value="Ana Martínez">Ana Martínez</MenuItem>
                    </Select>
                  </FormControl>

                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Rango de fechas
                    </Typography>
                    {/* <DatePickerWithRange /> */}
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Gráficos */}
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Visualización
                </Typography>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="visualización tabs">
                      <Tab label="Por Estado" />
                      <Tab label="Por Plazo" />
                      <Tab label="Por Responsable" />
                    </Tabs>
                  </Box>
                  <TabPanel value={tabValue} index={0}>
                    {/* <CompromisosPorEstado /> */}
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    {/* <CompromisosPorPlazo /> */}
                  </TabPanel>
                  <TabPanel value={tabValue} index={2}>
                    {/* <CompromisosPorResponsable /> */}
                  </TabPanel>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Tabla de Compromisos */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Compromisos y Acuerdos
            </Typography>
            <Box sx={{ overflowX: "auto" }}>
              {filteredCompromisos.length === 0 ? (
                <Box sx={{ py: 4, textAlign: "center" }}>
                  <Typography color="text.secondary">
                    No se encontraron compromisos con los filtros seleccionados
                  </Typography>
                </Box>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th
                        style={{ textAlign: "left", padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.12)" }}
                      >
                        Actividad
                      </th>
                      <th
                        style={{ textAlign: "left", padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.12)" }}
                      >
                        Fecha
                      </th>
                      <th
                        style={{ textAlign: "left", padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.12)" }}
                      >
                        Estado
                      </th>
                      <th
                        style={{ textAlign: "left", padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.12)" }}
                      >
                        Sede
                      </th>
                      <th
                        style={{ textAlign: "left", padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.12)" }}
                      >
                        Responsable
                      </th>
                      <th
                        style={{ textAlign: "left", padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.12)" }}
                      >
                        Plazo
                      </th>
                      <th
                        style={{ textAlign: "right", padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.12)" }}
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody key="a">
                    {paginatedData.map((compromiso) => (
                      <tr
                        key={compromiso.id}
                        onClick={() => setSelectedCompromiso(compromiso)}
                        style={{ cursor: "pointer", "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}
                      >
                        <td style={{ padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.12)" }}>
                          <Typography fontWeight="medium">{compromiso['compromisos / acuerdos'] ?? 'No tiene Compromiso'}</Typography>
                        </td>
                        <td style={{ padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.12)" }}>
                          {compromiso['fecha de seguimiento'] ?? 'No definida'}
                        </td>
                        <td style={{ padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.12)" }}>
                          {getEstadoChip(compromiso.estado)}
                        </td>
                        <td style={{ padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.12)" }}>
                          {compromiso['sedes/nodos']}
                        </td>
                        <td style={{ padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.12)" }}>
                          {compromiso['responsable 1']}
                        </td>
                        <td style={{ padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.12)" }}>
                          {getPlazoChip(compromiso['plazo de ejecución'] || 'No Definido')}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            borderBottom: "1px solid rgba(0,0,0,0.12)",
                            textAlign: "right",
                          }}
                        >
                          <IconButton size="small">
                            <ChevronDownIcon fontSize="small" />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
                          {/* Paginación */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination
                count={Math.ceil(filteredCompromisos.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                color="primary"
              />
            </Box>
            </Box>
          </Paper>

          <Dialog
                open={Boolean(selectedCompromiso)}
                onClose={() => setSelectedCompromiso(null)}
                fullWidth
                maxWidth="md" // puedes cambiar a "sm" o "lg"
                >
                <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
                    Detalles del Compromiso
                    <IconButton sx={{ ml: "auto" }} onClick={() => setSelectedCompromiso(null)}>
                    <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Box>
                            <Typography variant="body2" color="text.secondary">
                                {selectedCompromiso?.['compromisos / acuerdos'] || ''}
                            </Typography>
                            </Box>
                        </Box>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                                Información General
                            </Typography>
                            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 1 }}>
                                <Typography variant="body2" fontWeight="medium">
                                Fecha:
                                </Typography>
                                <Typography variant="body2">
                                {selectedCompromiso?.['fecha de seguimiento'] || ''}
                                </Typography>

                                <Typography variant="body2" fontWeight="medium">
                                Estado:
                                </Typography>
                                <Box>{getEstadoChip(selectedCompromiso?.estado)}</Box>

                                <Typography variant="body2" fontWeight="medium">
                                Sede:
                                </Typography>
                                <Typography variant="body2">{selectedCompromiso?.['sedes/nodos']}</Typography>

                                <Typography variant="body2" fontWeight="medium">
                                Responsable:
                                </Typography>
                                <Typography variant="body2">{selectedCompromiso?.['responsable 1']}</Typography>

                                <Typography variant="body2" fontWeight="medium">
                                Plazo:
                                </Typography>
                                <Box>{getPlazoChip(selectedCompromiso?.['plazo de ejecución'] || '')}</Box>
                            </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                                Detalles y Observaciones
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" fontWeight="medium">
                                Detalles:
                                </Typography>
                                <Typography variant="body2" sx={{ display: 'flex'}}>
                                {selectedCompromiso?.['observaciones']}
                                </Typography>
                            </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                            <Button variant="outlined">Editar</Button>
                        </Box>
                </DialogContent>
         </Dialog>
        </Container>
      </Box>
  )
}
