// React
import { Fragment, useMemo } from 'react'
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
    let { route } = useParams();

    if (!route)
        return (
            <Box sx={styles.contPrimary}>
                <h1>Routa No Definida</h1>
            </Box>            
        )
    
    const routeCapitalized = route
        ?.split("-")
        ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
        ?.join(" ");

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