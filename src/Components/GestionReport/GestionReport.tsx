import type React from "react"
import { useState } from "react"

// Material IU
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  AppBar,
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
} from "@mui/material"

// Icons Material IU
import {
  Add as AddIcon,
  Download as DownloadIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material"

// Interface
import { Informe } from '../../interfaces/interfaces' 

// Redux
import { useSelector } from "react-redux";

// Fetch
import { generateDoc as fetchGenerateDoc, updateDataProcessTask } from '../../services/process/Process'

// Redux
import { setReportForms } from "../../hooks/viewProcess";

// Redux
import { useDispatch, author } from "react-redux";

// Components
import FormDinamic from '../WorkPlan/Form/FormDinamic'

// Handlers
import Handlers from './handlers'

const procesos = [
  "ADMINISTRATIVO",
  "SALUD OCUPACIONAL",
  "DEPORTE Y RECREACIÓN",
]
const clasificaciones = ["Datos Clave", "Información General", "Secciones"]
const tipos = ["Text", "TextArea", "Number", "Select"]

const fieldSX = {
  "& .MuiInputBase-root": {
    height: 40,
    // Si quieres que el contenido interno esté centrado verticalmente:
    alignItems: "center",
  },
  // Ajuste fino del padding interno (opcional):
  "& .MuiInputBase-input": {
    padding: "0 14px",
  },
};

export default function GestionReport() {
  const [loading, setLoading] = useState(false)
  const [openAddVar, setOpenAddVar] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const dispatch = useDispatch();

  const informes: Informe[] = useSelector((state) => state.viewProcess.reportForms);
  const formItems = useSelector((state) => state.viewProcess.formProcess);
  const dataUser = useSelector((state) => state.session);
  const keygenDoc = formItems.map((doc) => {
    return {
      key: doc?.variable,
      value: doc?.valor
    }
  })
  const [newVar, setNewVar] = useState({
    id: "",
    variable: "",
    nombreVariable: "",
    proceso: null as string | null,
    valor: "",
    clasificacion: null as string | null,
    tipo: null as string | null,
  })

  const handleOpen = () => setOpenAddVar(true)
  const handleClose = () => setOpenAddVar(false)

  const handleField =
    (field: keyof typeof newVar) =>
    (_: any, valueOrEvent: any) => {
      const val =
        typeof valueOrEvent === "string"
          ? valueOrEvent
          : valueOrEvent?.target?.value ?? valueOrEvent
      setNewVar((prev) => ({ ...prev, [field]: val }))
    }

  const handleSubmit = () => {
    // Detectamos qué campos están vacíos
    const missingFields = Object.entries(newVar)
      .filter(([_, value]) => value === "" || value === null || value === undefined)
      .map(([key]) => {
        switch (key) {
          case "id": return "ID";
          case "variable": return "Variable";
          case "nombreVariable": return "Nombre de Variable";
          case "proceso": return "Proceso";
          case "valor": return "Valor";
          case "clasificacion": return "Clasificación";
          case "tipo": return "Tipo";
          default: return key;
        }
      });

    if (missingFields.length > 0) {
      setSnackbar({
        open: true,
        message: `Por favor completa los siguientes campos:\n• ${missingFields.join("\n• ")}`,
        severity: "error",
      });
      return; // No cerramos el diálogo
    }

    // Si todo OK
    setSnackbar({
      open: true,
      message: "Variable agregada exitosamente",
      severity: "success",
    });
    handleClose();
  };

  const {
    activeTab,
    activeStep,
    setActiveStep,
    setTabValue,
    pasos,
    handleNext,
    handleBack,
    handleTabChange,
    renderStepContent,
    getEstadoChip,
    getFormattedDate
  } = Handlers({ data: formItems})

  const handleGenerateDoc = async () => {
    setLoading(true)
    try {
      const response = await fetchGenerateDoc({
        data: keygenDoc,
        email: dataUser?.user?.email
      })

      if (response.status) {
        const responseUpdate = await updateDataProcessTask({
          "sheet_name": "INFOMES GENERADOS",
          "fecha": getFormattedDate(),
          "author": dataUser?.user?.email,
          "id_doc": response?.urlDocumento,
        },'registerFormDoc')

        setSnackbar({ open: true, message: "Informe generado exitosamente!", severity: "success" })
      } else {
        setSnackbar({ open: true, message: "Error al generar el informe.", severity: "error" })
      }
    } catch (error) {
      console.log(error)
      setSnackbar({ open: true, message: "Error al generar el informe.", severity: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ background: '#fff', padding: '10px', margin: 'unset', maxWidth: '1300px !important' }}>
      <AppBar position="static" color="white" elevation={0}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "rgb(235, 62, 38)",
            },
            "& .MuiTab-root": {
              color: "rgb(177, 177, 177)",
              fontWeight: 700,
              "&.Mui-selected": {
                color: "rgb(235, 62, 38)",
              },
            },
          }}
          variant="fullWidth"
        >
          <Tab label="Informes" value={0} />
          <Tab label="Crear Informe de Gestión" value={1} />
        </Tabs>
      </AppBar>

      {activeTab === 0 && (
        <Card variant="outlined">
          <CardHeader
            title=""
            action={
              <Box sx={{ display: 'flex', gap: '30px'}}>
                <Button 
                  onClick={handleOpen}
                  sx={{ background: "rgb(235, 62, 38)" }} 
                  variant="contained" 
                  color="primary"
                  startIcon={!loading ? <AddIcon /> : null}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Agregar Variable"}
                </Button>
                <Button 
                  onClick={handleGenerateDoc}
                  sx={{ background: "rgb(235, 62, 38)" }} 
                  variant="contained" 
                  color="primary"
                  startIcon={!loading ? <DescriptionIcon /> : null}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Generar Informe"}
                </Button>
              </Box>
            }
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              "& .MuiCardHeader-action": {
                margin: { xs: "8px 0 0 0", sm: 0 },
                width: { xs: "100%", sm: "auto" },
              },
            }}
          />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Fecha</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Editor</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Descargar
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {informes?.length > 0 ? (
                    informes.map((informe, index) => (
                      <TableRow key={index} hover>
                        <TableCell sx={{ fontWeight: "medium" }}>{index + 1}</TableCell>
                        <TableCell>{informe.fecha}</TableCell>
                        <TableCell>{informe?.author}</TableCell>
                        <TableCell>{getEstadoChip(informe.estado)}</TableCell>
                        <TableCell align="right">
                          <IconButton href={`https://docs.google.com/document/d/${informe?.id_doc}`} target="_blank" size="small" color="primary">
                            <DownloadIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No se han encontrado informes o no se han generado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {activeTab === 1 && (
        <FormDinamic {...{activeStep, pasos, renderStepContent, handleNext, handleBack  }} />
      )}

      <Dialog open={openAddVar} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Agregar Variable</DialogTitle>
        <DialogContent sx={{ display: "grid", gap: 2, pt: 1 }}>
          {/* ID */}
          <TextField
            label="ID"
            value={newVar.id}
            sx={fieldSX}
            onChange={(e) => handleField("id")(null, e.target.value)}
            fullWidth
          />

          {/* VARIABLE */}
          <TextField
            label="VARIABLE"
            value={newVar.variable}
            sx={fieldSX}
            onChange={(e) =>
              setNewVar((p) => ({ ...p, variable: e.target.value }))
            }
            fullWidth
          />

          {/* NOMBRE_VARIABLE */}
          <TextField
            label="Nombre Variable"
            value={newVar.nombreVariable}
            sx={fieldSX}
            onChange={(e) =>
              setNewVar((p) => ({ ...p, nombreVariable: e.target.value }))
            }
            fullWidth
          />

          {/* PROCESO */}
          <Autocomplete
            options={procesos}
            value={newVar.proceso}
            onChange={handleField("proceso")}
            freeSolo={false}
            sx={fieldSX}
            renderInput={(params) => (
              <TextField {...params} label="Proceso" fullWidth />
            )}
          />

          {/* VALOR */}
          <TextField
            label="Valor"
            value={newVar.valor}
            sx={fieldSX}
            onChange={(e) =>
              setNewVar((p) => ({ ...p, valor: e.target.value }))
            }
            fullWidth
          />

          {/* Clasificación */}
          <Autocomplete
            options={clasificaciones}
            value={newVar.clasificacion}
            onChange={handleField("clasificacion")}
            sx={fieldSX}
            renderInput={(params) => (
              <TextField {...params} label="Clasificación" fullWidth />
            )}
          />

          {/* Tipo */}
          <Autocomplete
            options={tipos}
            value={newVar.tipo}
            sx={fieldSX}
            onChange={handleField("tipo")}
            renderInput={(params) => (
              <TextField {...params} label="Tipo" fullWidth />
            )}
          />
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button sx={{ border: '1px solid rgb(235, 62, 38)', color: 'rgb(235, 62, 38)' }} onClick={handleClose}>Cancelar</Button>
          <Button sx={{ background: 'rgb(235, 62, 38)' }} variant="contained" onClick={handleSubmit}>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}