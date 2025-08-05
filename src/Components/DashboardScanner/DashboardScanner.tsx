"use client"

import { useMemo, useState } from "react"
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Breadcrumbs,
  Link,
  Divider,
} from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { School, LocationOn, CalendarToday, People, Assessment } from "@mui/icons-material"

// Redux
import { useSelector } from "react-redux";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    py: 3,
  },
  header: {
    backgroundColor: "#fff",
    borderBottom: "1px solid #e0e0e0",
    py: 2,
    mb: 3,
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  logoImage: {
    width: 60,
    height: 60,
    backgroundColor: "#dc2626",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1,
  },
  universityInfo: {
    display: "flex",
    flexDirection: "column",
  },
  universityName: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "#333",
  },
  universitySubtitle: {
    fontSize: "0.9rem",
    color: "#666",
  },
  breadcrumbs: {
    mb: 3,
  },
  title: {
    fontWeight: "bold",
    color: "#333",
    mb: 3,
  },
  filtersContainer: {
    backgroundColor: "#fff",
    p: 3,
    borderRadius: 2,
    mb: 3,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  filterControl: {
    minWidth: 200,
  },
  statsGrid: {
    mb: 3,
  },
  statCard: {
    p: 3,
    textAlign: "center",
    height: "100%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    borderRadius: 2,
  },
  statCardAlt1: {
    p: 3,
    textAlign: "center",
    height: "100%",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "#fff",
    borderRadius: 2,
  },
  statCardAlt2: {
    p: 3,
    textAlign: "center",
    height: "100%",
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    color: "#fff",
    borderRadius: 2,
  },
  statCardAlt3: {
    p: 3,
    textAlign: "center",
    height: "100%",
    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    color: "#fff",
    borderRadius: 2,
  },
  statIcon: {
    fontSize: 40,
    mb: 1,
  },
  statNumber: {
    fontSize: "2rem",
    fontWeight: "bold",
    mb: 1,
  },
  statLabel: {
    fontSize: "0.9rem",
    opacity: 0.9,
  },
  chartContainer: {
    backgroundColor: "#fff",
    p: 3,
    borderRadius: 2,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    mb: 3,
  },
  chartTitle: {
    fontWeight: "bold",
    mb: 2,
    color: "#333",
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 2,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  tableHeader: {
    backgroundColor: "#f8f9fa",
    fontWeight: "bold",
  },
  chip: {
    fontSize: "0.75rem",
  },
  avatar: {
    width: 32,
    height: 32,
    backgroundColor: "#dc2626",
  },
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00"]

export default function DashboardScanner() {
  const qrFormList = useSelector((state) => state.moduleQr.data);

  // Using sample data for demo
  const [studentData, setStudentData] = useState(qrFormList)
  const [dateFilter, setDateFilter] = useState("")
  const [sedeFilter, setSedeFilter] = useState("")
  const [lugarFilter, setLugarFilter] = useState("")

  // Get unique values for filters
  const uniqueDates = [...new Set(studentData.map((item) => item.fecha))]
  const uniqueSedes = [...new Set(studentData.map((item) => item.sede))]
  const uniqueLugares = [...new Set(studentData.map((item) => item.lugar))]

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    return studentData.filter((item) => {
      return (
        (dateFilter === "" || item.fecha.includes(dateFilter)) &&
        (sedeFilter === "" || item.sede === sedeFilter) &&
        (lugarFilter === "" || item.lugar === lugarFilter)
      )
    })
  }, [studentData, dateFilter, sedeFilter, lugarFilter])

  // Calculate statistics
  const stats = useMemo(() => {
    const totalRegistros = filteredData.length
    const totalEstudiantes = new Set(filteredData.map((item) => item.codigoestudiante)).size
    const totalSedes = new Set(filteredData.map((item) => item.sede)).size
    const totalLugares = new Set(filteredData.map((item) => item.lugar)).size

    return {
      totalRegistros,
      totalEstudiantes,
      totalSedes,
      totalLugares,
    }
  }, [filteredData])

  // Prepare chart data
  const sedeChartData = useMemo(() => {
    const sedeCount = {}
    filteredData.forEach((item) => {
      sedeCount[item.sede] = (sedeCount[item.sede] || 0) + 1
    })
    return Object.entries(sedeCount).map(([sede, count]) => ({
      sede,
      count,
    }))
  }, [filteredData])

  const lugarChartData = useMemo(() => {
    const lugarCount = {}
    filteredData.forEach((item) => {
      lugarCount[item.lugar] = (lugarCount[item.lugar] || 0) + 1
    })
    return Object.entries(lugarCount).map(([lugar, count]) => ({
      lugar,
      count,
    }))
  }, [filteredData])

  const programaChartData = useMemo(() => {
    const programaCount = {}
    filteredData.forEach((item) => {
      programaCount[item["programa academico"]] = (programaCount[item["programa academico"]] || 0) + 1
    })
    return Object.entries(programaCount).map(([programa, count]) => ({
      programa,
      count,
    }))
  }, [filteredData])

  return (
    <Box sx={styles.container}>

      <Container maxWidth="xl">

        <Typography variant="h4" sx={styles.title}>
          Dashboard de Estadísticas
        </Typography>

        {/* Filters */}
        <Paper sx={styles.filtersContainer}>
          <Typography variant="h6" gutterBottom>
            Filtros
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth sx={styles.filterControl}>
                <InputLabel>Fecha</InputLabel>
                <Select value={dateFilter} label="Fecha" onChange={(e) => setDateFilter(e.target.value)}>
                  <MenuItem value="">Todas las fechas</MenuItem>
                  {uniqueDates.map((fecha) => (
                    <MenuItem key={fecha} value={fecha}>
                      {fecha}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth sx={styles.filterControl}>
                <InputLabel>Sede</InputLabel>
                <Select value={sedeFilter} label="Sede" onChange={(e) => setSedeFilter(e.target.value)}>
                  <MenuItem value="">Todas las sedes</MenuItem>
                  {uniqueSedes.map((sede) => (
                    <MenuItem key={sede} value={sede}>
                      {sede}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth sx={styles.filterControl}>
                <InputLabel>Lugar</InputLabel>
                <Select value={lugarFilter} label="Lugar" onChange={(e) => setLugarFilter(e.target.value)}>
                  <MenuItem value="">Todos los lugares</MenuItem>
                  {uniqueLugares.map((lugar) => (
                    <MenuItem key={lugar} value={lugar}>
                      {lugar}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={styles.statsGrid}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={styles.statCard}>
              <CardContent>
                <Assessment sx={styles.statIcon} />
                <Typography sx={styles.statNumber}>{stats.totalRegistros}</Typography>
                <Typography sx={styles.statLabel}>Total Registros</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={styles.statCardAlt1}>
              <CardContent>
                <People sx={styles.statIcon} />
                <Typography sx={styles.statNumber}>{stats.totalEstudiantes}</Typography>
                <Typography sx={styles.statLabel}>Estudiantes Únicos</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={styles.statCardAlt2}>
              <CardContent>
                <School sx={styles.statIcon} />
                <Typography sx={styles.statNumber}>{stats.totalSedes}</Typography>
                <Typography sx={styles.statLabel}>Sedes Activas</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={styles.statCardAlt3}>
              <CardContent>
                <LocationOn sx={styles.statIcon} />
                <Typography sx={styles.statNumber}>{stats.totalLugares}</Typography>
                <Typography sx={styles.statLabel}>Lugares Registrados</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.chartContainer}>
              <Typography variant="h6" sx={styles.chartTitle}>
                Registros por Sede
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sedeChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sede" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.chartContainer}>
              <Typography variant="h6" sx={styles.chartTitle}>
                Distribución por Lugar
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={lugarChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ lugar, percent }) => `${lugar} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {lugarChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Paper sx={styles.chartContainer}>
              <Typography variant="h6" sx={styles.chartTitle}>
                Programas Académicos
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={programaChartData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="programa" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Data Table */}
        <Paper sx={styles.tableContainer}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={styles.chartTitle}>
              Registros Detallados ({filteredData.length} registros)
            </Typography>
          </Box>
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.tableHeader}>ID</TableCell>
                  <TableCell sx={styles.tableHeader}>Fecha</TableCell>
                  <TableCell sx={styles.tableHeader}>Lugar</TableCell>
                  <TableCell sx={styles.tableHeader}>Código Estudiante</TableCell>
                  <TableCell sx={styles.tableHeader}>Programa Académico</TableCell>
                  <TableCell sx={styles.tableHeader}>Sede</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <Chip icon={<CalendarToday />} label={row.fecha} size="small" sx={styles.chip} />
                    </TableCell>
                    <TableCell>
                      <Chip icon={<LocationOn />} label={row.lugar} size="small" color="primary" sx={styles.chip} />
                    </TableCell>
                    <TableCell>{row.codigoestudiante}</TableCell>
                    <TableCell>{row["programa academico"]}</TableCell>
                    <TableCell>
                      <Chip icon={<School />} label={row.sede} size="small" color="secondary" sx={styles.chip} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  )
}