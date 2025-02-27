// React
import React from 'react'

// Material IU
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

interface Params {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    errorText: string,
    typeLabel : string
}

export default function AlertMenssage(props: Params) {

    const { open, setOpen, errorText, typeLabel }= props

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={open}
                onClose={handleClose}
                key={2}
            >
            <Alert severity={typeLabel}>{errorText}</Alert> 
            </Snackbar>
        </Box>
    )
}