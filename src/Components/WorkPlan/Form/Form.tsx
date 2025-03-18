"use client"

// React
import type React from "react"

// Material IU
import {
  Dialog,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  IconButton,
  Tab,
  Tabs,
  AppBar,
  Typography,
} from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
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
  console.log(formItems,"formItems")
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
          // Contenido de "Crear Informe"
          <>
            <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
              <Stepper activeStep={activeStep} alternativeLabel sx={{ width: "80%" }}>
                {pasos.map((label, index) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconProps={{
                        sx: {
                          "&.Mui-active": {
                            color: "#e53935",
                          },
                          "&.Mui-completed": {
                            color: "#e57373",
                          },
                          "&.Mui-disabled": {
                            color: "#ffcdd2",
                          },
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            <Box
              sx={{
                p: 4,
                m: 2,
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                position: "relative",
                minHeight: "500px",
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
                {pasos[activeStep]}
              </Typography>

              {renderStepContent(activeStep)}

              <IconButton
                sx={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "#e57373",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#ef5350",
                  },
                }}
                onClick={handleNext}
                disabled={activeStep === pasos.length - 1}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
              <Button sx={{ color: "rgb(235, 62, 38)"}}disabled={activeStep === 0} onClick={handleBack}>
                Atrás
              </Button>
              <Button sx={{ background: "rgb(235, 62, 38)"}} variant="contained" color="primary" onClick={activeStep === pasos.length - 1 ? onClose : handleNext}>
                {activeStep === pasos.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  )
}
