"use client"

// React
import type React from "react"

// Material IU
import {
  Box,
  Tab,
  Tabs,
  AppBar,
  Typography,
} from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"

// Interface
import { CrearInformeModalProps } from '../../../interfaces/interfaces'

// Styles
import styles from '../styles'

// Handlers
import Handlers from './handlers'

// Redux
import { useSelector } from "react-redux";

// Components
import FormDinamic from './FormDinamic'

export default function Form({ open = true, onClose, workPlan }: CrearInformeModalProps) {

  const formItems = useSelector((state) => state.viewProcess.formProcess);
  const {
    activeStep, 
    setActiveStep,
    tabValue, 
    setTabValue,
    pasos,
    handleNext,
    handleBack,
    handleTabChange,
    renderStepContent
  } = Handlers({ data: formItems})

  return (
    <Card sx={styles.contCardTabs}>
      <CardContent>
        <AppBar position="static" color="default" elevation={0}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "rgb(235, 62, 38)",
                },
                "& .MuiTab-root": {
                  color: "rgb(177, 177, 177)",
                  fontWeight: 700,
                  "&.Mui-selected": {
                    color: "rgb(235, 62, 38)",
                  },
                },
              }}
            variant="fullWidth"
          >
            <Tab label="Plan De Trabajo" value={0} />
            <Tab label="Generar Informe de Gestion" value={1} />
          </Tabs>
        </AppBar>

        {tabValue === 0 ? (
            <Box sx={styles.contIframe}>
                <iframe 
                    src={workPlan?.url} 
                    width="100%" 
                    height="100%" 
                />
            </Box>
        ) : (
          <FormDinamic {...{activeStep, pasos, renderStepContent, handleNext, handleBack  }}/>
        )}
      </CardContent>
    </Card>
  )
}
