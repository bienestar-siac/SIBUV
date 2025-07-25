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
} from "@mui/material"
import { Add as AddIcon, QrCodeScanner as QrCodeScannerIcon, Close as CloseIcon } from "@mui/icons-material"
import Quagga from "@ericblade/quagga2"

console.log("Quagga:", Quagga);
console.log("Quagga.init:", Quagga?.init);


// Redux
import { useSelector } from "react-redux";

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
    padding: "48px",
    textAlign: "center",
    margin: "16px 0",
  },
  scannerIcon: {
    fontSize: "64px",
    color: "#A0AEC0",
    marginBottom: "16px",
  },
}

// 
import { createScannerNew } from '../../services/process/Process'


export default function StudentTrackingComponent() {
  const [openScanner, setOpenScanner] = useState(false)
  const [scannedCode, setScannedCode] = useState("")
  const [selectedPlace, setSelectedPlace] = useState("")
  const [studentData, setStudentData] = useState([])

  const qrFormList = useSelector((state) => state.moduleQr.data)
  const videoRef = useRef(null)

  const today = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleOpenScanner = () => {
    if (!selectedPlace) {
      alert("Selecciona un lugar antes de abrir el escáner.")
      return
    }
    setOpenScanner(true)
  }

  const handleCloseScanner = () => {
    Quagga.stop()
    setOpenScanner(false)
    setScannedCode("")
  }

  useMemo(() => {
    setStudentData(qrFormList)
  }, [qrFormList])

  useEffect(() => {
    if (!openScanner || !videoRef.current) return

    console.log("Quagga init:", Quagga, Quagga.init)

    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: videoRef.current,
        constraints: { facingMode: "environment" },
      },
      decoder: { readers: ["code_128_reader"] },
    }, (err) => {
      if (err) {
        console.error("Quagga init error:", err)
        return
      }
      Quagga.start()
    })

    Quagga.onDetected((data) => {
      const code = data.codeResult.code
      console.log("Escaneado:", code)
      setScannedCode(code)
      setStudentData(prev => [
        ...prev,
        { id: Date.now(), codigoEstudiante: code, fecha: new Date().toLocaleDateString("es-CO"), lugar: selectedPlace }
      ])
      Quagga.stop()
    })

    return () => {
      Quagga.offDetected()
      Quagga.stop()
    }
  }, [openScanner])

  return (
    <Box sx={styles.container}>
      {/* Header */}
      <Paper sx={styles.header}>
        <Typography sx={styles.title}>Seguimiento de Estudiantes</Typography>
        <Typography sx={styles.subtitle}>{today}</Typography>
      </Paper>

      {/* Botones de acción */}
      <Box sx={{ marginBottom: "24px", display: "flex", gap: "12px" }}>
        <Button disabled variant="contained" startIcon={<AddIcon />} sx={styles.primaryButton}>
          NUEVO ESTUDIANTE
        </Button>
        <Button
          variant="contained"
          startIcon={<QrCodeScannerIcon />}
          sx={styles.secondaryButton}
          onClick={() => setOpenScanner(true)}
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
              <TableCell sx={styles.tableHeaderCell}>Lugar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentData.map((student) => (
              <TableRow key={student.id}>
                <TableCell sx={styles.tableCell}>{student.codigoestudiante}</TableCell>
                <TableCell sx={styles.tableCell}>{student.fecha}</TableCell>
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
          <IconButton onClick={handleCloseScanner} sx={{ position: 'absolute', top: 8, right: 8, color: '#718096' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={styles.scannerArea}>
            <div ref={videoRef} style={styles.video}></div>
            <Box sx={styles.overlay} />
          </Box>
          {scannedCode && (
            <Typography variant="h6" sx={{ mt: 2, color: '#38A169' }}>
              Código escaneado: {scannedCode}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseScanner} sx={{ color: '#718096' }}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}