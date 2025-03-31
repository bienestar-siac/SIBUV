// React
import { Fragment, useState } from 'react'

// Material-UI
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
  TablePagination,
  Button,
  Box
} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

// Redux
import { useSelector } from "react-redux"

// Styles
import styles from '../styles.ts'

// Handlers
import Handlers from './Handler'

// Components
import UpdateTask from '../UpdateTask/updateTask'

export default function TableActivities() {
  const {
    page,
    actividades,
    rowsPerPage, 
    open, setOpen,
    paginatedData,
    handleChangeRowsPerPage,
    handleChangePage
  } = Handlers()

  return (
    <Fragment>
      <UpdateTask {...{open, setOpen}} />
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent sx={{ position: 'relative'}}>
            <Typography variant="h6" component="h3" fontWeight="bold" sx={{ mb: 2 }}>
              Actividades
            </Typography>
            <Box sx={styles.contOptions}>
                <Button
                    onClick={() => setOpen(true)}
                    variant="contained"
                    color="error"
                    sx={styles.contBtnFilter}
                    startIcon={<AddIcon />}
                >
                    <span className="title">
                      ACTUALIZAR TAREA
                    </span>
                </Button>
            </Box>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Actividad</TableCell>
                    <TableCell>Tareas</TableCell>
                    <TableCell>Responsable</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.map((actividad, index) => (
                    <TableRow key={index} sx={{ ...styles.tableRowText, "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <span>{actividad.actividad}</span>
                      </TableCell>
                      <TableCell><span>{actividad.tarea}</span></TableCell>
                      <TableCell>{actividad.responsable_tarea}</TableCell>
                      <TableCell>{actividad.fecha}</TableCell>
                      <TableCell>{actividad.estado}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Paginación */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={actividades.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      </Grid>
    </Fragment>
  )
}