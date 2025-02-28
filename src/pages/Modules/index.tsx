// React
import { Fragment } from 'react'

// Components
import Header from "../../Components/Header/Header"
import SectionModules from "../../Components/Modules/Modules"

// Material IU
import {
    Box
} from "@mui/material"

export default function Modules() {
    return (
        <Fragment>
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#f5f5f5',
                    minHeight: '100vh',
                    marginTop: '70px'
                }}
            >
                <Header />
                <SectionModules />
            </Box>
        </Fragment>
    )
} 