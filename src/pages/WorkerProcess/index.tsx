// React
import { Fragment, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';

// Components
import Header from "../../Components/Header/Header"
import CustomBreadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs'
import WorkerProcess from '../../Components/WorkerProcess/WorkerProcess'

// Material IU
import { Box } from "@mui/material"

// Styles
import styles from './styles'

// Redux
import { useDispatch } from "react-redux";

// Handlers
import Handlers from './handlers'

export default function Process() {
    const { route } = useParams();
    const [ isAvaibleRoute, set] = useState(null)

    // Handlers
    const handlers = Handlers({ route: route, set})
    const routeCapitalized = handlers.capitalizedText(route)

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
    console.log(!route || isAvaibleRoute,"!route || isAvaibleRoute)")
    if (!route || isAvaibleRoute)
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
                    { value: 'Procesos', path: '/module/process'},
                    { value: `${routeCapitalized}`, path: `/module/process/${route}`}
                ]} />
                <WorkerProcess />
            </Box>
        </Fragment>
    )  
}