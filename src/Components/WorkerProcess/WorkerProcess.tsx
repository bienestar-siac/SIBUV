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
import Percentage from './Percentage/Percentage'

// Styles
import styles from './styles'

export default function WorkerProcess() {

  return (
    <Box sx={styles.viewWorker}>
      <Tools />
      <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
        Cumplimiento de tareas
      </Typography>

      <Grid container spacing={3}>
        <TableActivities />
        <Percentage />
      </Grid>
    </Box>
  )
}