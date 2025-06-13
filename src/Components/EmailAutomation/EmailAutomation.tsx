"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router";
import {
  Container,
  Box,
} from "@mui/material"
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination,
  Grid,
} from "@mui/material"
import RichTextEditor from "./rich-text-editor"
import emailjs from 'emailjs-com';

// Components
import Tools from './Tools/Tools'

// Handlers
import Handlers from './handler'

// Redux
import { useSelector } from "react-redux"

// Styles
import styles from './styles'

// Fetch
import { getViewDataProcess } from "../../services/process/decryptdata"
import { updatePrompt } from "../../services/process/Process"

// Sample data for the table
const sampleData = [
  { id: 1, correo: "atencion.violenciasgenero@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 2, correo: "asuntos.etnicos@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 3, correo: "gustavo.lozada@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 4, correo: "contabilidadyfondos.vbu@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 5, correo: "campusdiverso@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 6, correo: "decano.salud@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 7, correo: "perla.saavedra@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 8, correo: "alix.velasco@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 9, correo: "viviana.castillo@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 10, correo: "direccion.infraestructura@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 11, correo: "mantenimiento@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 12, correo: "planeacion@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 13, correo: "discapacidad.inclusion@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 14, correo: "seccion.crd@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 15, correo: "servicios.varios@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 16, correo: "cristian.mosquera.casanova@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 17, correo: "areacultura.cdr@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 18, correo: "alfonso.puchana@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 19, correo: "desarrollo.humano@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 20, correo: "aida.palacios@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 21, correo: "restaurante@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 22, correo: "patricia.martos@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 23, correo: "seccion.saludocupacional@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 24, correo: "seguridad.vigilancia@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 25, correo: "liliana.arias.castillo@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 26, correo: "adriana.banguero@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 27, correo: "direccion.servisalud@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 28, correo: "vicerrectoria.academica@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 29, correo: "vrad@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 30, correo: "luz.sabogal@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 31, correo: "coordinacion.vbu@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
  { id: 32, correo: "vicerrectoria.regionalizacion@correounivalle.edu.co", prompt: "", fecha: "30/05/2025", estado: "Pendiente" },
];

export default function ToolsAgreements() {
  const [customPrompt, setCustomPrompt] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [htmlPrompt, setHtmlPrompt] = useState('')
  const [prompt, setPrompt] = useState("")
  const itemsPerPage = 5

  const serviceId =  import.meta.env.VITE_APP_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID
  const userId =  import.meta.env.VITE_APP_EMAILJS_USER_ID

  const handleSubmit = () => {
    console.log("Prompt:", customPrompt)
    console.log("Email:", recipientEmail)
    // Here you would typically send the data to your backend
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "completado":
        return styles.statusCompleted
      case "pendiente":
        return styles.statusPending
      case "fallido":
        return styles.statusFailed
      default:
        return {}
    }
  }
  
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    //setFeedback(null);
    const form = e.target;
    const formData = {
      to_email: form.to_email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    if (!/\S+@\S+\.\S+/.test(formData.to_email)) {
      return;
    }
    if (!formData.subject.trim() || !formData.message.trim()) {
      return;
    }

    try {
      const result = await emailjs.send(serviceId, templateId, formData, userId);
      console.log('EmailJS resultado:', result);
      form.reset();
    } catch (error) {
      console.error('Error EmailJS:', error);
    } finally {
 
    }
  };

  const handlePropmChange = async (html) => {
    setHtmlPrompt(html)
    const text = html.replace(/<[^>]+>/g, '').trim()
    setPrompt(text)
    // setDisabled(false)
    await updatePrompt({
        prompt_html: html,
        prompt_neutral: text
    })
  }

  const totalPages = Math.ceil(sampleData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = sampleData.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    const init = async () => {
      const data = await getViewDataProcess({
          "sheet_name": "PROMPT IA EMAIL",
      })
      setHtmlPrompt(data?.[0]?.promp)
      setPrompt(data?.[0]?.promp_neutro)
    }
    init()
  }, [])
  
  return (
    <div style={styles.container}>
      <Typography variant="h1" style={styles.title}>
        Configuracion de Prompt Email
      </Typography>

      <div style={styles.formContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RichTextEditor  
            value={htmlPrompt} 
            onChange={handlePropmChange} 
            placeholder="Enter your custom prompt here..." />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              type="email"
              label="Correo destinatario"
              variant="outlined"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              style={styles.textField}
              placeholder="ejemplo@correo.com"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button variant="contained" onClick={handleSubmit} style={styles.submitButton} fullWidth>
              Enviar Prueba
            </Button>
          </Grid>
        </Grid>
      </div>

      <TableContainer component={Paper} style={styles.tableContainer}>
        <Table>
          <TableHead style={styles.tableHeader}>
            <TableRow>
              <TableCell style={styles.tableHeaderCell}>Correo</TableCell>
              <TableCell style={styles.tableHeaderCell}>Mensaje</TableCell>
              <TableCell style={styles.tableHeaderCell}>Fecha</TableCell>
              <TableCell style={styles.tableHeaderCell}>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((row) => (
              <TableRow key={row.id}>
                <TableCell style={styles.tableCell}>{row.correo}</TableCell>
                <TableCell style={styles.tableCell}>
                  {row.prompt.length > 50 ? `${row.prompt.substring(0, 50)}...` : row.prompt}
                </TableCell>
                <TableCell style={styles.tableCell}>{row.fecha}</TableCell>
                <TableCell style={{ ...styles.tableCell, ...getStatusStyle(row.estado) }}>{row.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={styles.paginationContainer}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          style={styles.pagination}
        />
      </div>
    </div>
  )
}
