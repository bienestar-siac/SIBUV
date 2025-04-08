// React
import { Fragment, useMemo, useState } from 'react'

// Components
import Header from "../../Components/Header/Header"
import CustomBreadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs'
import ModuleQuality from '../../Components/ModuleQuality/ModuleQuality'

// Material IU
import { Box } from "@mui/material"

// Styles
import styles from './styles'

// Handlers
import Handlers from './handlers'

export default function Process() {
    const [ isAvaibleRoute, set] = useState(null)

    // Handlers
    const handlers = Handlers({set})

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

    if (isAvaibleRoute)
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
                    { value: 'Inicio', path: '/'}, 
                    { value: 'Modulos', path: '/modules'},
                    { value: `Sistema interno de aseguramiento de calidad`, path: `/module/sistema-interno-de-aseguramiento-de-calidad`},
                ]} />
                <Box sx={styles.contPageLimit}>
                    <ModuleQuality />
                </Box>
            </Box>
        </Fragment>
    )  
}