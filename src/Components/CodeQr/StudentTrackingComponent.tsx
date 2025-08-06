"use client"

import { useState, useMemo, useRef, useEffect} from "react"
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  TextField,
  CircularProgress,
} from "@mui/material"
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Add as AddIcon, QrCodeScanner as QrCodeScannerIcon, Close as CloseIcon } from "@mui/icons-material"
import Quagga from "@ericblade/quagga2"

// Redux
import { useSelector } from "react-redux";

// React Router Dom
import { useNavigate } from "react-router";

// Estilos basados en los colores de la imagen
const styles = {
  container: {
    backgroundColor: "#F7FAFC",
    minHeight: "100vh",
    padding: "24px",
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: "24px",
    borderRadius: "8px",
    marginBottom: "24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  title: {
    color: "#2D3748",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  subtitle: {
    color: "#718096",
    fontSize: "14px",
  },
  primaryButton: {
    backgroundColor: "#E53E3E",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#C53030",
    },
    textTransform: "none",
    fontWeight: "bold",
    borderRadius: "6px",
  },
  statsButton: {
    backgroundColor: "#db8b13d0",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#a36014ff",
    },
    textTransform: "none",
    fontWeight: "bold",
    borderRadius: "6px",
  },
  secondaryButton: {
    backgroundColor: "#3182CE",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#2C5282",
    },
    textTransform: "none",
    fontWeight: "bold",
    borderRadius: "6px",
  },
  tableContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  tableHeader: {
    backgroundColor: "#F7FAFC",
  },
  tableHeaderCell: {
    color: "#4A5568",
    fontWeight: "bold",
    fontSize: "14px",
  },
  tableCell: {
    color: "#2D3748",
    fontSize: "14px",
  },
  statusChip: {
    backgroundColor: "#38A169",
    color: "#FFFFFF",
    fontSize: "12px",
  },
  dialog: {
    "& .MuiDialog-paper": {
      borderRadius: "12px",
      padding: "16px",
    },
  },
  dialogTitle: {
    color: "#2D3748",
    fontWeight: "bold",
  },
  scannerArea: {
    backgroundColor: "#F7FAFC",
    border: "2px dashed #CBD5E0",
    borderRadius: "8px",
    // padding: "48px",
    textAlign: "center",
    margin: "16px 0",
    padding: "0",       
    overflow: "hidden",
  },
  scannerIcon: {
    fontSize: "64px",
    color: "#A0AEC0",
    marginBottom: "16px",
  },
  video: {
    position: 'relative',
    width: "100%",
    height: "300px",
    overflow: 'hidden',
    zIndex: '20px',
  },
  overlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    border: "2px dashed rgba(255,255,255,0.7)"
  },
  selectControl: { zIndex: '30px'},
  formRow: { position: 'relative', display: "flex", zIndex: '100', flexDirection: 'column', gap: "16px", marginBottom: "16px" },
}

// 
import { createScannerNew } from '../../services/process/Process'

const places = [
    'Restaurante', 'CDU', 'Cultura', 'Asuntos Etnicos',
    'Bienestar Laboral', 'Desarrollo Humano', 'Politica de Genero'
]
  
const programs = [
    'Ingeniería de Sistemas', 'Administración de Empresas',
    'Psicología', 'Comunicación Social', 'Derecho'
]
  
const campuses = [
  'Sede Buga',
  'Sede Caicedonia',
  'Sede Cartago',
  'Sede Tuluá',
  'Sede Pacífico',
  'Sede Norte del Cauca',
  'Sede Palmira',
  'Sede Yumbo',
  'Sede Zarzal',
  'Sede Cali - Melendez',
  'Sede Cali - San Fernando'
]

export default function StudentTrackingComponent() {
  // Navigate
  const navigate = useNavigate();

  // Estados booleanos
  const [openNew, setOpenNew] = useState(false)
  const [openScanner, setOpenScanner] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  // Nuevo estudiante
  const [newStudent, setNewStudent] = useState({ codigo: '', place: '', programa: '', sede: '' })
  const [errors, setErrors] = useState({ codigo: false, place: false, programa: false, sede: false })
  const [loadingNew, setLoadingNew] = useState(false)

  // Scanner States
  const qrFormList = useSelector((state) => state.moduleQr.data)
  const [studentData, setStudentData] = useState([])
  const [scannedCode, setScannedCode] = useState("")
  const [selectedPlace, setSelectedPlace] = useState('')
  const [selectedProgram, setSelectedProgram] = useState('')
  const [selectedCampus, setSelectedCampus] = useState('')

  const videoRef = useRef(null)
  const canScan = selectedPlace && selectedProgram && selectedCampus
  const today = new Date().toLocaleDateString("es-CO", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  })

  const handleOpenScanner = () => {
    setOpenScanner(true)
  }

  const handleCloseScanner = () => {
    Quagga.stop()
    setOpenScanner(false)
    setScannedCode("")
  }

  const validateNew = () => {
    const newErrors = {
      codigo: !newStudent.codigo.trim(),
      place: !newStudent.place,
      programa: !newStudent.programa,
      sede: !newStudent.sede,
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some(e => e)
  }

  const handleNewSubmit = async () => {
    if (!validateNew()) return
    setLoadingNew(true)
    try {
      await createScannerNew({
        FECHA: today,
        LUGAR: newStudent.place,
        codigoEstudiante: newStudent.codigo,
        ProgramAcademy: newStudent.programa,
        sede: newStudent.sede,
        spreadsheet_id: "1mon8QU6jeBEFbHJEpeewImi3qEVTTSi4uuL8Mdp6ns8",
      })
      setStudentData(prev => [...prev, {
        id: Date.now(),
        codigoestudiante: newStudent.codigo,
        fecha: today,
        lugar: newStudent.place,
        'programa academico': newStudent.programa,
        sede: newStudent.sede,
      }])
      setOpenNew(false)
      setSnackbar({ open: true, message: 'Estudiante creado', severity: 'success' })
      setNewStudent({ codigo: '', place: '', programa: '', sede: '' })
    } catch (error) {
      setSnackbar({ open: true, message: 'Fallo el registro', severity: 'error' })
    } finally {
      setLoadingNew(false)
    }
  }

  useMemo(() => {
    setStudentData(qrFormList)
  }, [qrFormList])

  useEffect(() => {
    // if (!openScanner) return;

    const initScanner = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });

        setTimeout(() => {
          if (videoRef.current) {
            Quagga.init({
              inputStream: {
                name: "Live",
                type: "LiveStream",
                target: videoRef.current,
                constraints: {
                  width: { min: 640 },
                  height: { min: 480 },
                  facingMode: "environment",
                },
              },
              decoder: { readers: ["code_128_reader"] },
            }, (err) => {
              if (err) {
                console.error("Error al iniciar Quagga:", err);
                return;
              }
              Quagga.start();
            });

            Quagga.onDetected(handleDetected);
          }
        }, 500);

      } catch (err) {
        console.error("Error al acceder a la cámara:", err);
      }
    };

    const handleDetected = (data) => {
      const code = data.codeResult.code;
      console.log("Código detectado:", code);
      setScannedCode(code);
      setStudentData(prev => [
        ...prev,
        {
          id: Date.now(),
          codigoEstudiante: code,
          fecha: new Date().toLocaleDateString("es-CO"),
          lugar: selectedPlace,
          programa: selectedProgram,
          sede: selectedCampus,
        },
      ]);
      Quagga.stop();
    };

    initScanner();

    return () => {
      Quagga.offDetected(handleDetected);
      Quagga.stop();
    };
  }, [openScanner]);

  return (
    <Box sx={styles.container}>
      {/* Header */}
      <Paper sx={styles.header}>
        <Typography sx={styles.title}>Seguimiento de Estudiantes</Typography>
        <Typography sx={styles.subtitle}>{today}</Typography>
      </Paper>

      {/* Botones de acción */}

      <Box sx={{ marginBottom: "24px", display: "flex", gap: "12px" }}>
        <Button
          onClick={() => navigate('/module/codigo-de-barras/dashboard')}
          variant="contained" 
          startIcon={<AssessmentIcon />} 
          sx={styles.statsButton}>
          ESTADISTICAS
        </Button>
        <Button  onClick={() => setOpenNew(true)} variant="contained" startIcon={<AddIcon />} sx={styles.primaryButton}>
          NUEVO ESTUDIANTE
        </Button>
        <Button
          variant="contained"
          startIcon={<QrCodeScannerIcon />}
          sx={styles.secondaryButton}
          onClick={handleOpenScanner}
        >
          ESCANEAR CÓDIGO
        </Button>
      </Box>

      {/* Tabla de estudiantes */}
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table>
          <TableHead sx={styles.tableHeader}>
            <TableRow>
              <TableCell sx={styles.tableHeaderCell}>Código Estudiante</TableCell>
              <TableCell sx={styles.tableHeaderCell}>Fecha</TableCell>
              <TableCell sx={styles.tableHeaderCell}>Programa Academico</TableCell>
              <TableCell sx={styles.tableHeaderCell}>Sede</TableCell>
              <TableCell sx={styles.tableHeaderCell}>Lugar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentData.map((student) => (
              <TableRow key={student.id}>
                <TableCell sx={styles.tableCell}>{student.codigoestudiante}</TableCell>
                <TableCell sx={styles.tableCell}>{student.fecha}</TableCell>
                <TableCell sx={styles.tableCell}>{student?.['programa academico']}</TableCell>
                <TableCell sx={styles.tableCell}>{student.sede}</TableCell>
                <TableCell sx={styles.tableCell}>{student.lugar}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Dialog para escáner */}
      <Dialog open={openScanner} onClose={handleCloseScanner} maxWidth="sm" fullWidth sx={styles.dialog}>
        <DialogTitle sx={styles.dialogTitle}>
          Escáner de Código de Barras
          <IconButton onClick={handleCloseScanner} sx={{ position: 'absolute', top: 8, right: 8, color: '#718096', zIndex: '30' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={styles.formRow}>
            <FormControl sx={styles.selectControl}>
              <InputLabel>Lugar</InputLabel>
              <Select value={selectedPlace} label="Lugar" onChange={e => setSelectedPlace(e.target.value)}>
                {places.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl sx={styles.selectControl}>
              <InputLabel>Programa</InputLabel>
              <Select value={selectedProgram} label="Programa" onChange={e => setSelectedProgram(e.target.value)}>
                {programs.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl sx={styles.selectControl}>
              <InputLabel>Sede</InputLabel>
              <Select value={selectedCampus} label="Sede" onChange={e => setSelectedCampus(e.target.value)}>
                {campuses.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
          {
            canScan && (
              <>
                <Box sx={styles.scannerArea}>
                  <div ref={videoRef} style={styles.video}></div>
                  <Box sx={styles.overlay} />
                </Box>
                {scannedCode && (
                  <Typography variant="h6" sx={{ mt: 2, color: '#38A169' }}>
                    Código escaneado: {scannedCode}
                  </Typography>
                )}
              </>
            )
          }
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseScanner} sx={{ color: '#718096' }}>Cerrar</Button>
        </DialogActions>
      </Dialog>
 
      {/* Dialog nuevo estudiante */}
      <Dialog open={openNew} onClose={()=>setOpenNew(false)} fullWidth maxWidth="sm" sx={styles.dialogPaper}>
        <DialogTitle>Crear Estudiante<IconButton onClick={()=>setOpenNew(false)} sx={{position:'absolute',top:8,right:8}}><CloseIcon/></IconButton></DialogTitle>
        <DialogContent>
          <Box sx={styles.formRow} flexDirection="column">
            <TextField label="Código" fullWidth value={newStudent.codigo} onChange={e=>setNewStudent({...newStudent,codigo:e.target.value})} />
            <FormControl sx={styles.selectControl}>
              <InputLabel>Lugar</InputLabel>
              <Select value={newStudent.place} label="Lugar" onChange={e=>setNewStudent({...newStudent,place:e.target.value})}>
                {places.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl sx={styles.selectControl} fullWidth>
              <InputLabel>Programa</InputLabel>
                <Select value={newStudent.programa} onChange={e=>setNewStudent({...newStudent,programa:e.target.value})}>
                  {programs.map(p=><MenuItem key={p} value={p}>{p}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl sx={styles.selectControl} fullWidth><InputLabel>Sede</InputLabel><Select value={newStudent.sede} onChange={e=>setNewStudent({...newStudent,sede:e.target.value})}>{campuses.map(c=><MenuItem key={c} value={c}>{c}</MenuItem>)}</Select></FormControl>
          </Box>
        </DialogContent>
        <DialogActions><Button onClick={handleNewSubmit} variant="contained">Crear</Button></DialogActions>
      </Dialog>

      {/* Dialog escáner */}
      <Dialog open={openNew} onClose={() => setOpenNew(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          Crear Estudiante
          <IconButton onClick={() => setOpenNew(false)} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Código"
              fullWidth
              value={newStudent.codigo}
              onChange={e => {
                setNewStudent(s => ({ ...s, codigo: e.target.value }));
                setErrors(e => ({ ...e, codigo: false }));
              }}
              error={errors.codigo}
              helperText={errors.codigo && 'El código es obligatorio'}
            />
            <FormControl fullWidth error={errors.place}>
              <InputLabel>Lugar</InputLabel>
              <Select
                value={newStudent.place}
                label="Lugar"
                onChange={e => {
                  setNewStudent(s => ({ ...s, place: e.target.value }));
                  setErrors(e => ({ ...e, place: false }));
                }}
              >
                {places.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </Select>
              {errors.place && <Typography variant="caption" color="error">Selecciona un lugar</Typography>}
            </FormControl>
            <FormControl fullWidth error={errors.programa}>
              <InputLabel>Programa</InputLabel>
              <Select
                value={newStudent.programa}
                label="Programa"
                onChange={e => {
                  setNewStudent(s => ({ ...s, programa: e.target.value }));
                  setErrors(e => ({ ...e, programa: false }));
                }}
              >
                {programs.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </Select>
              {errors.programa && <Typography variant="caption" color="error">Selecciona un programa</Typography>}
            </FormControl>
            <FormControl fullWidth error={errors.sede}>
              <InputLabel>Sede</InputLabel>
              <Select
                value={newStudent.sede}
                label="Sede"
                onChange={e => {
                  setNewStudent(s => ({ ...s, sede: e.target.value }));
                  setErrors(e => ({ ...e, sede: false }));
                }}
              >
                {campuses.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
              {errors.sede && <Typography variant="caption" color="error">Selecciona una sede</Typography>}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            variant="contained"
            onClick={handleNewSubmit}
            disabled={loadingNew}
            sx={{
              background: '#E53E3E'
            }}
            startIcon={loadingNew ? <CircularProgress size={20} /> : <AddIcon />}
          >
            {loadingNew ? 'Guardando...' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={()=>setSnackbar(s=>({...s,open:false}))}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  )
}