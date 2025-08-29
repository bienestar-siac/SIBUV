"use client"

import type React from "react"
import { useState, useMemo } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Chip,
  Paper,
  Avatar,
  InputAdornment,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Divider,
} from "@mui/material"
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Timeline as TimelineIcon,
  CheckCircle as CheckCircleIcon,
  OpenInNew as OpenInNewIcon,
  ContentCopy as ContentCopyIcon,
  Close as CloseIcon,
} from "@mui/icons-material"

// Estilos globales
const styles = {
  container: {
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    padding: 3,
  },
  header: {
    backgroundColor: "#ffffff",
    borderRadius: 2,
    padding: 3,
    marginBottom: 3,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  statsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 2,
    padding: 2,
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
    },
  },
  actionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 2,
    padding: 2,
    marginBottom: 2,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
    },
  },
  filterSection: {
    backgroundColor: "#ffffff",
    borderRadius: 2,
    padding: 2,
    marginBottom: 3,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  dialog: {
    "& .MuiDialog-paper": {
      width: "100%",
      maxWidth: 900,
      padding: 2,
    },
  },
  primaryColor: "#d32f2f",
  secondaryColor: "#757575",
  accentColor: "#f44336",
  successColor: "#4caf50",
  warningColor: "#ff9800",
}

interface AccionMejoramiento {
  responsable_directivo: string
  responsable_operativo: string
  accion: string
  acuerdo: string
  segumiento: string
  plazo: string
  articulo: string
}

interface Props {
  data: AccionMejoramiento[]
}

// Redux
import { useSelector } from "react-redux";

export default function PoliticaGeneroDashboard() {
  const data = useSelector((state) => state.committeePeace.data)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterResponsable, setFilterResponsable] = useState("")
  const [filterAccion, setFilterAccion] = useState("")

  // Dialog state
  const [openDetail, setOpenDetail] = useState(false)
  const [selectedRow, setSelectedRow] = useState<AccionMejoramiento | null>(null)

  // Filtros únicos
  const responsablesUnicos = useMemo(() => {
    const responsables = new Set((data || []).map((item: AccionMejoramiento) => item.responsable_directivo || ""))
    return Array.from(responsables).filter(Boolean)
  }, [data])

  // acciones únicas para el selector (truncadas en el menú para legibilidad)
  const accionesUnicas = useMemo(() => {
    const acciones = new Set((data || []).map((item: AccionMejoramiento) => (item.accion || "").trim()))
    return Array.from(acciones).filter(Boolean)
  }, [data])

  const articulosUnicos = useMemo(() => {
    const articulos = new Set((data || []).map((item: AccionMejoramiento) => item.articulo || ""))
    return Array.from(articulos).filter(Boolean)
  }, [data])

  // Datos filtrados
  const datosFiltrados = useMemo(() => {
    return (data || []).filter((item: AccionMejoramiento) => {
      const accionText = (item.accion || "").toLowerCase()
      const respDirText = (item.responsable_directivo || "").toLowerCase()
      const respOpText = (item.responsable_operativo || "").toLowerCase()
      const matchSearch =
        searchTerm === "" ||
        accionText.includes(searchTerm.toLowerCase()) ||
        respDirText.includes(searchTerm.toLowerCase()) ||
        respOpText.includes(searchTerm.toLowerCase())

      const matchResponsable = filterResponsable === "" || (item.responsable_directivo || "") === filterResponsable

      // ahora filtramos por acción exacta seleccionada en el selector
      const matchAccion = filterAccion === "" || (item.accion || "") === filterAccion

      return matchSearch && matchResponsable && matchAccion
    })
  }, [data, searchTerm, filterResponsable, filterAccion])

  // Estadísticas
  const estadisticas = useMemo(() => {
    const total = (data || []).length
    const conPlazo = (data || []).filter((item: AccionMejoramiento) => (item.plazo || "") !== "X" && (item.plazo || "") !== "").length
    const responsablesUnicosCount = new Set((data || []).map((item: AccionMejoramiento) => item.responsable_directivo)).size
    const acuerdosUnicos = new Set((data || []).map((item: AccionMejoramiento) => item.acuerdo)).size

    return {
      total,
      conPlazo,
      responsablesUnicos: responsablesUnicosCount,
      acuerdosUnicos,
      porcentajeConPlazo: total > 0 ? Math.round((conPlazo / total) * 100) : 0,
    }
  }, [data])

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return ""
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  // Dialog handlers
  function handleOpenDetail(item: AccionMejoramiento) {
    setSelectedRow(item)
    setOpenDetail(true)
  }
  function handleCloseDetail() {
    setOpenDetail(false)
    setSelectedRow(null)
  }

  async function handleCopyDetail() {
    if (!selectedRow) return
    const txt = [
      `Artículo: ${selectedRow.articulo || "-"}`,
      `Acción: ${selectedRow.accion || "-"}`,
      `Acuerdo: ${selectedRow.acuerdo || "-"}`,
      `Seguimiento: ${selectedRow.segumiento || "-"}`,
      `Responsable Directivo: ${selectedRow.responsable_directivo || "-"}`,
      `Responsable Operativo: ${selectedRow.responsable_operativo || "-"}`,
      `Plazo: ${selectedRow.plazo || "-"}`,
    ].join("\n\n")
    try {
      await navigator.clipboard.writeText(txt)
      // opcional: feedback (puedes reemplazar por snackbar)
      // alert("Detalle copiado al portapapeles")
    } catch (e) {
      console.error("No se pudo copiar al portapapeles", e)
    }
  }

  return (
    <Box sx={styles.container}>
      {/* Header */}
      <Paper sx={styles.header}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: styles.primaryColor,
            fontWeight: "bold",
            marginBottom: 1,
          }}
        >
          Comité de convivencia paz y seguridad
        </Typography>
        <Typography variant="subtitle1" sx={{ color: styles.secondaryColor }}>
          Seguimiento de Acciones de Mejoramiento
        </Typography>
      </Paper>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={styles.statsCard}>
            <CardContent>
              <Avatar
                sx={{
                  backgroundColor: styles.primaryColor,
                  margin: "0 auto 16px",
                  width: 56,
                  height: 56,
                }}
              >
                <AssignmentIcon />
              </Avatar>
              <Typography
                variant="h4"
                sx={{
                  color: styles.primaryColor,
                  fontWeight: "bold",
                }}
              >
                {estadisticas.total}
              </Typography>
              <Typography variant="body2" sx={{ color: styles.secondaryColor }}>
                Total Acciones
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={styles.statsCard}>
            <CardContent>
              <Avatar
                sx={{
                  backgroundColor: styles.successColor,
                  margin: "0 auto 16px",
                  width: 56,
                  height: 56,
                }}
              >
                <TimelineIcon />
              </Avatar>
              <Typography
                variant="h4"
                sx={{
                  color: styles.successColor,
                  fontWeight: "bold",
                }}
              >
                {estadisticas.porcentajeConPlazo}%
              </Typography>
              <Typography variant="body2" sx={{ color: styles.secondaryColor }}>
                Con Plazo Definido
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={styles.statsCard}>
            <CardContent>
              <Avatar
                sx={{
                  backgroundColor: styles.warningColor,
                  margin: "0 auto 16px",
                  width: 56,
                  height: 56,
                }}
              >
                <GroupIcon />
              </Avatar>
              <Typography
                variant="h4"
                sx={{
                  color: styles.warningColor,
                  fontWeight: "bold",
                }}
              >
                {estadisticas.responsablesUnicos}
              </Typography>
              <Typography variant="body2" sx={{ color: styles.secondaryColor }}>
                Responsables
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={styles.statsCard}>
            <CardContent>
              <Avatar
                sx={{
                  backgroundColor: styles.accentColor,
                  margin: "0 auto 16px",
                  width: 56,
                  height: 56,
                }}
              >
                <CheckCircleIcon />
              </Avatar>
              <Typography
                variant="h4"
                sx={{
                  color: styles.accentColor,
                  fontWeight: "bold",
                }}
              >
                {estadisticas.acuerdosUnicos}
              </Typography>
              <Typography variant="body2" sx={{ color: styles.secondaryColor }}>
                Acuerdos Únicos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filtros */}
      <Paper sx={styles.filterSection}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ marginBottom: 2 }}>
          <FilterIcon sx={{ color: styles.primaryColor }} />
          <Typography variant="h6" sx={{ color: styles.primaryColor }}>
            Filtros
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar en acciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: styles.secondaryColor }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              select
              variant="outlined"
              label="Responsable Directivo"
              value={filterResponsable}
              onChange={(e) => setFilterResponsable(e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              {responsablesUnicos.map((responsable) => (
                <MenuItem key={responsable} value={responsable}>
                  {responsable}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Selector por acción */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              select
              variant="outlined"
              label="Acción"
              value={filterAccion}
              onChange={(e) => setFilterAccion(e.target.value)}
            >
              <MenuItem value="">Todas</MenuItem>
              {accionesUnicas.map((accion) => (
                <MenuItem key={accion} value={accion}>
                  {truncateText(accion, 80)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Resultados */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" sx={{ color: styles.primaryColor }}>
          Mostrando {datosFiltrados.length} de {data.length} acciones
        </Typography>
      </Box>

      {/* Lista de Acciones */}
      <Grid container spacing={3}>
        {datosFiltrados.map((item: AccionMejoramiento, index: number) => (
          <Grid item xs={12} key={index}>
            <Card sx={styles.actionCard}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: styles.primaryColor,
                        marginBottom: 2,
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                      onClick={() => handleOpenDetail(item)}
                      title="Ver detalle"
                    >
                      {truncateText(item.accion, 100)}
                    </Typography>

                    <Stack spacing={2}>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: styles.secondaryColor,
                            fontWeight: "bold",
                          }}
                        >
                          Responsable Directivo:
                        </Typography>
                        <Typography variant="body2">{item.responsable_directivo}</Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: styles.secondaryColor,
                            fontWeight: "bold",
                          }}
                        >
                          Responsable Operativo:
                        </Typography>
                        <Typography variant="body2">{item.responsable_operativo}</Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: styles.secondaryColor,
                            fontWeight: "bold",
                          }}
                        >
                          Seguimiento:
                        </Typography>
                        <Typography variant="body2">{truncateText(item.segumiento, 150)}</Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={2}>
                      <Chip
                        label={item.plazo === "X" ? "Sin Plazo" : `Plazo: ${item.plazo}`}
                        color={item.plazo === "X" ? "default" : "success"}
                        variant="outlined"
                      />

                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: styles.secondaryColor,
                            fontWeight: "bold",
                            marginBottom: 1,
                          }}
                        >
                          Acuerdo:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            backgroundColor: "#f5f5f5",
                            padding: 1,
                            borderRadius: 1,
                            fontSize: "0.875rem",
                          }}
                        >
                          {item.acuerdo}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "space-between" }}>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: styles.secondaryColor,
                              fontWeight: "bold",
                              marginBottom: 1,
                            }}
                          >
                            Artículo:
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              backgroundColor: "#e3f2fd",
                              padding: 1,
                              borderRadius: 1,
                              fontSize: "0.875rem",
                            }}
                          >
                            {item.articulo}
                          </Typography>
                        </Box>

                        <IconButton onClick={() => handleOpenDetail(item)} aria-label="Ver detalle">
                          <OpenInNewIcon />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {datosFiltrados.length === 0 && (
        <Paper
          sx={{
            padding: 4,
            textAlign: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography variant="h6" sx={{ color: styles.secondaryColor }}>
            No se encontraron acciones que coincidan con los filtros aplicados
          </Typography>
        </Paper>
      )}

      {/* DIALOG: detalle de la fila */}
      <Dialog open={openDetail} onClose={handleCloseDetail} sx={styles.dialog} fullWidth maxWidth="md" aria-labelledby="detalle-dialog">
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: styles.primaryColor }}>
            Detalle del compromiso
          </Typography>
          <IconButton onClick={handleCloseDetail} size="small" aria-label="Cerrar">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {selectedRow ? (
            <Box>
              <Typography variant="subtitle2" sx={{ color: styles.secondaryColor, fontWeight: "bold", mb: 1 }}>
                Artículo
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {selectedRow.articulo || "-"}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle2" sx={{ color: styles.secondaryColor, fontWeight: "bold", mb: 1 }}>
                Acción
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line", mb: 2 }}>
                {selectedRow.accion || "-"}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle2" sx={{ color: styles.secondaryColor, fontWeight: "bold", mb: 1 }}>
                Acuerdo
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line", mb: 2 }}>
                {selectedRow.acuerdo || "-"}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle2" sx={{ color: styles.secondaryColor, fontWeight: "bold", mb: 1 }}>
                Seguimiento
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line", mb: 2 }}>
                {selectedRow.segumiento || "-"}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ color: styles.secondaryColor, fontWeight: "bold", mb: 1 }}>
                    Responsable Directivo
                  </Typography>
                  <Typography variant="body2">{selectedRow.responsable_directivo || "-"}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ color: styles.secondaryColor, fontWeight: "bold", mb: 1 }}>
                    Responsable Operativo
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>{selectedRow.responsable_operativo || "-"}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ color: styles.secondaryColor, fontWeight: "bold", mb: 1 }}>
                    Plazo
                  </Typography>
                  <Typography variant="body2">{selectedRow.plazo || "-"}</Typography>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Typography variant="body2">Cargando...</Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button startIcon={<ContentCopyIcon />} onClick={handleCopyDetail}>
            Copiar detalle
          </Button>
          <Button onClick={handleCloseDetail} color="primary" variant="contained">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
