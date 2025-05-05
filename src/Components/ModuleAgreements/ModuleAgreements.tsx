"use client"
 

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

// Components Local
import TotalAgreements from "./TotalAgreements/TotalAgreements"
import DashBoardAgreements from "./DashBoardAgreements/DashBoardAgreements"
import TableAgreements from './TableAgreements/TableAgreements'
import ViewPopUpAgreements from './ViewPopUpAgreements/ViewPopUpAgreements'

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
        return <Chip label={estado} sx={{ backgroundColor: '#eb3e26', color: 'white'}} />
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
              <Button sx={{ backgroundColor: '#eb3e26'}} variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setIsDialogOpen(true)}>
                Nuevo Compromiso
              </Button>
              <Button variant="outlined" startIcon={<RefreshIcon />}>
                 Herramientas
              </Button>
            </Box>
          </Box>

          {/* KPIs */}
          <TotalAgreements {...{
            dataAgreements, 
            compromisosEnEjecucion, 
            porcentajeEjecucion, 
            porcentajePendientes,
            compromisosFinalizados,
            porcentajeFinalizados,
            compromisosPendientes,
          }}/>

          <DashBoardAgreements {...{
              searchQuery,
              selectedSede,
              setSelectedSede,
              sedes,
              selectedEstado,
              setSelectedEstado,
              selectedResponsable,
              setSelectedResponsable,
              handleTabChange,
              tabValue,
          }} />

          {/* Tabla de Compromisos */}
          <TableAgreements {...{
              filteredCompromisos,
              paginatedData,
              setSelectedCompromiso,
              getPlazoChip,
              getEstadoChip,
              page,
              handleChangePage,
              rowsPerPage,
          }}/>

          <ViewPopUpAgreements {...{
            setSelectedCompromiso,
            getEstadoChip,
            getPlazoChip,
            selectedCompromiso
          }}/>
          
        </Container>
      </Box>
  )
}
