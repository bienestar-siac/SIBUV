// React
import { Fragment } from 'react'

// Components
import Header from "../../Components/Header/Header"
import SectionModules from "../../Components/Modules/Modules"
import CustomBreadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs'

// Material IU
import { Box } from "@mui/material"

// Styles
import styles from './styles'

export default function Modules() {
    return (
        <Fragment>
            <Box sx={styles.contPrimary}>
                <Header />
                <CustomBreadcrumbs paths={[
                    { value: 'Inicio', path: '/'}, 
                    { value: 'Modulos', path: '/modules'},
                ]} />
                <SectionModules />
            </Box>
        </Fragment>
    )
} 