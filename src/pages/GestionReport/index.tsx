// React
import { Fragment, useState, useMemo } from 'react'

// Components
import Header from "../../Components/Header/Header"
import GestionReportView from "../../Components/GestionReport/GestionReport"
import CustomBreadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs'

// Material IU
import { Box } from "@mui/material"

// Styles
import styles from './styles'

// Handlers
import Handlers from './handlers'

export default function GestionReport() {
    const [ isAvaibleRoute, set ] = useState(null)

    // Handlers
    const handlers = Handlers({ set })

    // Effects
    useMemo(handlers.init,[])    

    if (isAvaibleRoute === null)
        return (
            <Box sx={styles.noFoundPage}>
                <h1>
                    Cargando Pagina...
                </h1>
            </Box>            
        )

    if (isAvaibleRoute === true)
        return (
            <Box sx={styles.noFoundPage}>
                <h1>
                    No se encontro, ningun registro de la 
                    pagina que esta tratando de acceder
                </h1>
            </Box>            
        )

    return (
        <Fragment>
            <Box sx={styles.contPrimary}>
                <Header />
                <CustomBreadcrumbs paths={[
                    { value: 'Inicio', path: '#'}, 
                    { value: 'Modulos', path: '/modules'},
                    { value: 'Informe de Gestión', path: '/modules'},
                ]} />
                <Box sx={styles.contPageLimit}>
                    <GestionReportView />
                </Box>
            </Box>
        </Fragment>
    )
} 