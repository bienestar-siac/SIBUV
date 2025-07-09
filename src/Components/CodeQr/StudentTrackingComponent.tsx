"use client"

import { useState } from "react"
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
} from "@mui/material"
import { Add as AddIcon, QrCodeScanner as QrCodeScannerIcon, Close as CloseIcon } from "@mui/icons-material"

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

// Datos de ejemplo
const studentData = [
  {
    id: 1,
    codigoEstudiante: "EST001",
    idRegistro: "REG2025001",
    fecha: "09/01/2025",
    estado: "Activo",
  },
  {
    id: 2,
    codigoEstudiante: "EST002",
    idRegistro: "REG2025002",
    fecha: "09/01/2025",
    estado: "Activo",
  },
  {
    id: 3,
    codigoEstudiante: "EST003",
    idRegistro: "REG2025003",
    fecha: "08/01/2025",
    estado: "Pendiente",
  },
]

export default function StudentTrackingComponent() {
  const [openScanner, setOpenScanner] = useState(false)
  const [scannedCode, setScannedCode] = useState("")

  const handleOpenScanner = () => {
    setOpenScanner(true)
  }

  const handleCloseScanner = () => {
    setOpenScanner(false)
    setScannedCode("")
  }

  const handleScanCode = () => {
    // Simulación de escaneo de código de barras
    const mockCode = `EST${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`
    setScannedCode(mockCode)
  }

  return (
    <Box sx={styles.container}>
      {/* Header */}
      <Paper sx={styles.header}>
        <Typography sx={styles.title}>Seguimiento de Estudiantes</Typography>
        <Typography sx={styles.subtitle}>miércoles, 9 de julio de 2025</Typography>
      </Paper>

      {/* Botones de acción */}
      <Box sx={{ marginBottom: "24px", display: "flex", gap: "12px" }}>
        <Button variant="contained" startIcon={<AddIcon />} sx={styles.primaryButton}>
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
              <TableCell sx={styles.tableHeaderCell}>ID de Registro</TableCell>
              <TableCell sx={styles.tableHeaderCell}>Fecha</TableCell>
              <TableCell sx={styles.tableHeaderCell}>Estado</TableCell>
              <TableCell sx={styles.tableHeaderCell}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentData.map((student) => (
              <TableRow key={student.id}>
                <TableCell sx={styles.tableCell}>{student.codigoEstudiante}</TableCell>
                <TableCell sx={styles.tableCell}>{student.idRegistro}</TableCell>
                <TableCell sx={styles.tableCell}>{student.fecha}</TableCell>
                <TableCell>
                  <Chip
                    label={student.estado}
                    sx={{
                      ...styles.statusChip,
                      backgroundColor: student.estado === "Activo" ? "#38A169" : "#ED8936",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button size="small" sx={styles.secondaryButton} onClick={handleOpenScanner}>
                    Escanear
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog para escáner de código de barras */}
      <Dialog open={openScanner} onClose={handleCloseScanner} maxWidth="sm" fullWidth sx={styles.dialog}>
        <DialogTitle sx={styles.dialogTitle}>
          Escáner de Código de Barras
          <IconButton
            onClick={handleCloseScanner}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#718096",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={styles.scannerArea}>
            <QrCodeScannerIcon sx={styles.scannerIcon} />
            <Typography variant="h6" sx={{ color: "#4A5568", marginBottom: "8px" }}>
              Posiciona el código de barras frente a la cámara
            </Typography>
            <Typography variant="body2" sx={{ color: "#718096" }}>
              El escaneo se realizará automáticamente
            </Typography>
            {scannedCode && (
              <Box sx={{ marginTop: "16px" }}>
                <Typography variant="h6" sx={{ color: "#38A169" }}>
                  Código escaneado: {scannedCode}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 24px" }}>
          <Button onClick={handleScanCode} sx={styles.primaryButton} variant="contained">
            Simular Escaneo
          </Button>
          <Button onClick={handleCloseScanner} sx={{ color: "#718096" }}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}