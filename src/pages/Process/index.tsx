// React
import { Fragment } from 'react'

// Components
import Header from "../../Components/Header/Header"
import ProcessModule from '../../Components/Process/Process'

// Material IU
import { Box } from "@mui/material"

// Styles
import styles from './styles'

export default function Process() {
    return (
        <Fragment>
            <Box sx={styles.contPrimary}>
                <Header />
                <ProcessModule />
            </Box>
        </Fragment>
    )  
}