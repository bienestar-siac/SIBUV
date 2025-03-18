// React
import React from 'react'

// Material IU
import { Box, Button } from "@mui/material"

// Redux
import { useSelector } from "react-redux";

// Styles
import styles from './styles'

// Components
import Form from './Form/Form'

export default function WorkPlan() {
    const workPlan = useSelector((state) => state.viewProcess.workPlan);

    if (!workPlan?.url) {
        return (
            <Box>
                <h1>No Se Encontro una Ruta</h1>
            </Box>            
        )
    }

    return (
        <Box>
            <Form workPlan={workPlan} />
        </Box>
    )
}