// React
import React from 'react';

// Material IU
import {
    Box,
    Typography,
} from "@mui/material"

// Styles
import styles from '../styles'

// Components
import FilterMenu from './FilterMenu'

export default function Filter() {

    return (
        <Box sx={styles.contFilter}>
            <Typography
                variant="h6"
                component="div"
                sx={styles.titleModule}
            >
                Módulos por Procesos
            </Typography>
            <FilterMenu />
        </Box>
    )
}
