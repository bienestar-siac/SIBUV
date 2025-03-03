// React
import { Fragment, useMemo } from 'react'

// Components
import Header from "../../Components/Header/Header"
import ProcessModule from '../../Components/Process/Process'

// Material IU
import { Box } from "@mui/material"

// Styles
import styles from './styles'

// Redux
import { useDispatch } from "react-redux";

// Handlers
import Handlers from './handlers'

export default function Process() {
    const dispatch = useDispatch();
    const hanlders = Handlers({ dispatch }) 
    useMemo(hanlders.init,[])

    return (
        <Fragment>
            <Box sx={styles.contPrimary}>
                <Header />
                <ProcessModule />
            </Box>
        </Fragment>
    )  
}