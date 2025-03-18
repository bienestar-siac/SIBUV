// React
import { useState } from "react"
import { useParams } from 'react-router-dom';

// Components
import InformacionGeneral from "./Steps/informacion-general"
import SeccionesBienestar from "./Steps/secciones-bienestar"
import ProgramasPoliticas from "./Steps/programas-politicas"
import DatosClave from "./Steps/datos-clave"

export default ({ data }) => {
    const { route,} = useParams();
    const [activeStep, setActiveStep] = useState(0)
    const [tabValue, setTabValue] = useState(0)
  
    const capitalizedText = (text: string) => {
        return text
        ?.split("-")
        ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
        ?.join(" ");
    }

    const pasos = ["Información General", `Secciones de ${capitalizedText(route)}`, "Datos Clave"]
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
  
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue)
    }
  
    const renderStepContent = (step: number) => {
      switch (step) {
        case 0:
          return <InformacionGeneral 
                    fields={data?.filter(
                        item => item?.clasificacion === 'Información General'
                    )} 
                 />
        case 1:
          return <SeccionesBienestar 
                    fields={data?.filter(
                        item => item?.clasificacion === 'Secciones'
                    )} 
                 />
        case 2:
          return <DatosClave 
                    fields={data?.filter(
                        item => item?.clasificacion === 'Datos Clave'
                    )} 
                 />
        default:
          return <div>Paso no encontrado</div>
      }
    }

    return {
        activeStep, 
        setActiveStep,
        tabValue, 
        setTabValue,
        pasos,
        handleNext,
        handleBack,
        handleTabChange,
        renderStepContent
    }
}