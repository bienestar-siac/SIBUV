"use client"

// Materia IU
import {
  Box,
  Breadcrumbs,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material"
import { Link as LinkIcon } from "@mui/icons-material"
import { Link } from "react-router-dom";

// Components
import Tools from './Tools/Tools'
import TableActivities from './Table/Table'

export default function WorkerProcess() {

  // Datos de ejemplo para los gráficos de progreso
  const progresos = [
    { valor: 75, label: "Tareas completadas" },
    { valor: 45, label: "Documentos procesados" },
    { valor: 90, label: "Cumplimiento general" },
  ]

  return (
    <Box sx={{ width: '-webkit-fill-available', maxWidth: 1300, margin: "0 auto", padding: '24px 0' }}>
      <Tools />
      {/* Sección de cumplimiento de tareas */}
      <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
        Cumplimiento de tareas
      </Typography>

      <Grid container spacing={3}>
        <TableActivities />
        {/* Gráficos de progreso */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%'}}>
            <CardContent>
              <Typography variant="h6" component="h3" fontWeight="bold" sx={{ mb: 2, textAlign: "center" }}>
                Porcentaje Avance
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {progresos.map((progreso, index) => (
                  <Grid item xs={4} key={index} sx={{ textAlign: "center" }}>
                    <Box sx={{ position: "relative", display: "inline-flex", mb: 1 }}>
                      <CircularProgress
                        variant="determinate"
                        value={progreso.valor}
                        size={80}
                        thickness={4}
                        sx={{
                          color: "#e53935",
                          "& .MuiCircularProgress-circle": {
                            strokeLinecap: "round",
                          },
                        }}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="body1" component="div" fontWeight="bold">
                          {`${progreso.valor}%`}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {progreso.label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}