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
    const { route, tool } = useParams();
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
                    { value: `${routeCapitalized}`, path: `/module/process/${route}`},
                ]} />
                <Box
                    sx={{
                        padding: '10px',
                        height: '100%',
                        width: '100%',
                        maxWidth: '1300px',
                        margin: '0 auto',
                        height: '80vh'
                    }}
                >
                    <iframe width="100%" height="100%" src="https://docs.google.com/spreadsheets/d/1gtrI7nHubmPTU6MWuEmbV3VS4G_Jm-jGpnthkxoylYU/edit?gid=1475811537#gid=1475811537" />
                </Box>
            </Box>
        </Fragment>
    )  
}