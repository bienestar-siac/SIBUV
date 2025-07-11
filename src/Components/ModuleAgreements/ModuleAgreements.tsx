"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router";
import {
  Container,
  Box,
  Button,
  Typography
} from "@mui/material"
import {
  Add as AddIcon,
} from "@mui/icons-material"
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

// Components Local
import TotalAgreements from "./TotalAgreements/TotalAgreements"
import DashBoardAgreements from "./DashBoardAgreements/DashBoardAgreements"
import TableAgreements from './TableAgreements/TableAgreements'
import ViewPopUpAgreements from './ViewPopUpAgreements/ViewPopUpAgreements'
import CreatePopUpAgreements from './ViewPopUpAgreements/CreatePopUpAgreements'

// Handlers
import Handlers from './handler'

// Redux
import { useSelector } from "react-redux"

export default function Dashboard() {
  const dataAgreementsPrimary = useSelector((state) => state.moduleAgreements.agreements);
  const navigate = useNavigate();
  const  {
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
    totalCompromisosFiltered,
    handlerUpdateFunc,
    defaultValues,
    setDefaultValues,

    // Filter
    startDate, 
    setStartDate,
    endDate, 
    setEndDate,
  } = Handlers(dataAgreementsPrimary);

  useEffect(() => {
    if (dataAgreements?.length) {
      const sedesUnicas = [...new Set(dataAgreements.map(item => item['sedes/nodos']))]
      const uniqueResponsables = ([...new Set(dataAgreements.map(item => item?.['responsable 1']))]).filter((item) => {
        return item !== ''
      })
      setSedes(sedesUnicas)
      setResponsablesList(uniqueResponsables)
    }
  }, [dataAgreements])

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
              <Button onClick={() => navigate('/module/seguimiento-de-compromisos-y-acuerdos/herramientas')} sx={{  borderColor: '#eb3e26 !important', color: '#eb3e26' }}  variant="outlined" startIcon={<HomeRepairServiceIcon />}>
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
            totalCompromisosFiltered,
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
              filteredCompromisos,
              responsablesList,
              setResponsablesList,
              startDate,
              endDate,
              setStartDate,
              setEndDate,
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
            selectedCompromiso,
            handlerUpdateFunc,
          }}/>

          <CreatePopUpAgreements {...{
              open: isDialogOpen, 
              onClose: () => setIsDialogOpen(false), 
              onCreate: () => {}, 
              sedes,
              defaultValues: defaultValues,
              setDefaultValues,
              estados: ['EN EJECUCIÓN', 'PENDIENTE', 'CERRADO'], 
              plazos: ['Corto Plazo (1 a 3 meses)', 'Mediano plazo (3 a 6 meses)', 'Largo Plazo (más de 6 meses)']
          }}/>
        </Container>
      </Box>
  )
}
