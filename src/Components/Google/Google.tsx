// React
import React, { useEffect } from 'react';
import { decodeToken } from 'react-jwt';

// Material IU
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import LoadingButton from '@mui/lab/LoadingButton';

// Libs
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

// Components
import Show from '../Show/Show'


// Fecth
//import { isUserRegistered } from '../../services/accounts/login'

const _get_auth = (loader, data, setOpen, setErrorText) => {
    try {
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_CLIEN_ID_GOOGLE,
            callback: (response) => handleCredentialResponse(response, loader, data, setOpen, setErrorText),
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: 'outline', size: 'large', text: 'login with google' }
        );

        google.accounts.id.prompt();
    } catch (error) {
        console.log('error', error);
    }
};

const have_permission = ({ data, dataToken }) => {

};

const handleCredentialResponse = async (response, loader, data, setOpen, setErrorText) => {
    loader(true);
    try {
        const decodedToken = decodeToken(response.credential);        
        console.log(decodedToken)
    } catch (error) {
        console.log('error', error);
    }

    setTimeout(() => {
        loader(false)
    }, 2000)
};

export default () => {
    const [isload, setIsLoad] =  React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [data, setData] = React.useState([])
    const [errorText, setErrorText] = React.useState('No Tienes Acceso')

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (isload) return
        const _root = document.querySelector('body');
        const script_id = document.getElementById('google-login');

        if (script_id) {
            _root.removeChild(script_id);
        }

        const _script = document.createElement('script');
        _script.src = 'https://accounts.google.com/gsi/client';
        _script.async = true;
        _script.id = 'google-login';
        _script.defer = true;
        _root.appendChild(_script, _root);

        _script.onload = () => {
            _get_auth(setIsLoad, data, setOpen, setErrorText);
        };

    }, [isload]);

    return (
        <>
            <Show when={isload}>
                <LoadingButton loading variant="outlined" sx={{width: '100%'}}>
                    Submit
                </LoadingButton>
            </Show>
            <Show when={!isload}>
                <div className="contGoogle" id="buttonDiv" />
            </Show>
            <Box sx={{ width: 500 }}>
                <Snackbar
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={open}
                    onClose={handleClose}
                    key={2}
                >
                   <Alert severity="error">{errorText}</Alert> 
                </Snackbar>
            </Box>
        </>
    )
};