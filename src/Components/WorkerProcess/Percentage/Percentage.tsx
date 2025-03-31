// React
import React from 'react'

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

// Redux
import { useSelector } from "react-redux"

// Styles
import styles from '../styles'

export default () => {
    const actividades = useSelector((state) => state.viewProcess.taskList);
    const progresos = [
        { 
          valor: Math.round((actividades.filter(item => item?.estado === 'Finalizado').length / actividades.length) * 100 * 10) / 10, 
          label: "Tareas completadas" 
        },
        { 
          valor: Math.round((actividades.filter(item => item?.estado === 'Pendiente').length / actividades.length) * 100 * 10) / 10, 
          label: "Tareas Pendientes" 
        },
        { 
          valor: Math.round((actividades.filter(item => item?.estado === 'En Curso').length / actividades.length) * 100 * 10) / 10, 
          label: "Tareas en Proceso" 
        },
    ];      
  
    return (
        <Grid item xs={12} md={4}>
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
                        <Box sx={styles.circleProgress}>
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
    )
}