// React
import { Fragment } from 'react'

// Material IU
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Box,
    IconButton,
    Typography,
} from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export default ({ 
    activeStep, 
    pasos, 
    renderStepContent,
    handleNext, 
    handleBack 
}) => {
    return (
        <Fragment>
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

              {renderStepContent(activeStep,pasos[activeStep])}

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
              <Button sx={{ background: "rgb(235, 62, 38)"}} variant="contained" color="primary" onClick={activeStep === pasos.length - 1 ? null : handleNext}>
                {activeStep === pasos.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            </Box>
        </Fragment>
    )
}