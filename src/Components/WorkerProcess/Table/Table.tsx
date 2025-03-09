"use client"
import { Fragment } from 'react'

// Materia IU
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"

// Redux
import { useSelector } from "react-redux";

export default function TableActivities() {
    const actividades = useSelector((state) => state.viewProcess.taskList);

    return (
      <Fragment>
            {/* Tabla de actividades */}
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                    <Typography variant="h6" component="h3" fontWeight="bold" sx={{ mb: 2 }}>
                        Actividades
                    </Typography>
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell>Actividad</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Detalles</TableCell>
                            <TableCell>Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {actividades.map((actividad, index) => (
                            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                {actividad.actividad}
                                </TableCell>
                                <TableCell>{actividad.fecha}</TableCell>
                                <TableCell>{actividad.descricion}</TableCell>
                                <TableCell>{actividad.estado}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Fragment>
    )
}