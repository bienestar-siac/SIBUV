// React
import { useState } from "react"
import { useParams } from 'react-router-dom';

// Components
import Component from '../WorkPlan/Form/components/components'

export default ({ data }) => {
    console.log(data,"DATA DATA")
    const [activeStep, setActiveStep] = useState(0)
    const [activeTab, setTabValue] = useState(0)
  
    const capitalizedText = (text: string) => {
        return text
        ?.split("-")
        ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
        ?.join(" ");
    }

    const pasos = data?.reduce((acc, item) => {
      if (!acc.includes(item.proceso))
        acc.push(item?.proceso);
      return acc;
    }, [])
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
  
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue)
    }
  
    const renderStepContent = (step: number, name: string) => {
      console.log(step,"step")
      switch (step) {
        default:
          return <Component fields={data?.filter(item => String(item?.proceso) === String(name))} />
      }
    }

    const getEstadoChip = (estado: string) => {
      switch (estado) {
        case "completado":
          return <Chip label="Completado" color="success" size="small" />
        case "pendiente":
          return <Chip label="Pendiente" color="warning" size="small" />
        case "revisión":
          return <Chip label="En revisión" color="info" size="small" />
        default:
          return null
      }
    }
  
    const getFormattedDate = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = String(now.getFullYear()).slice(-2);
      return `${day}/${month}/${year}`;
    };
  

    return {
        activeStep, 
        setActiveStep,
        activeTab, 
        setTabValue,
        pasos,
        handleNext,
        handleBack,
        handleTabChange,
        renderStepContent,
        getEstadoChip,
        getFormattedDate
    }
}