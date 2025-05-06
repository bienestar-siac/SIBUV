import { useState, useEffect } from "react"

import Chip from '@mui/material/Chip'

export default (dataAgreementsPrimary) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedSede, setSelectedSede] = useState("todas")
    const [selectedEstado, setSelectedEstado] = useState("todos")
    const [selectedResponsable, setSelectedResponsable] = useState("todos")
    const [responsablesList, setResponsablesList] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedCompromiso, setSelectedCompromiso] = useState<any>(null)
    const [dataAgreements] = useState(dataAgreementsPrimary?.filter((item) => item?.estado !== undefined))
    const [tabValue, setTabValue] = useState(0)
    const [sedes, setSedes] = useState([])
    const [page, setPage] = useState(1);
    const rowsPerPage = 6;
  
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
      const matchesSede = compromiso?.['sedes/nodos'] === selectedSede;
      if (selectedSede === "todas") return true
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
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const paginatedData = filteredCompromisos.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    );

    return {
        // estados
        searchQuery,
        selectedSede,
        selectedEstado,
        selectedResponsable,
        isDialogOpen,
        selectedCompromiso,
        tabValue,
        page,
    
        // setters
        setSearchQuery,
        setSelectedSede,
        setSelectedEstado,
        setSelectedResponsable,
        setIsDialogOpen,
        setSelectedCompromiso,
    
        // datos procesados
        paginatedData,
        porcentajeEjecucion,
        porcentajePendientes,
        porcentajeFinalizados,
    
        // handlers
        handleChangePage,
        handleTabChange,
    
        // helpers
        getEstadoChip,
        getPlazoChip,
        dataAgreements,

        compromisosEnEjecucion,
        compromisosFinalizados,
        compromisosPendientes,
        sedes,
        filteredCompromisos,
        rowsPerPage,
        setSedes,
        responsablesList,
        setResponsablesList,
        totalCompromisosFiltered
    };
}