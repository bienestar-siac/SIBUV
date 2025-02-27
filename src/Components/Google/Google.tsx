// React
import React, { useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import { useNavigate } from "react-router";

// Material IU
import LoadingButton from '@mui/lab/LoadingButton';

// Components
import Show from '../Show/Show'
import AlertMenssage from '../Alerts/Alert'

// Fecth
import { getDataSheet } from '../../services/accounts/login'
import { decryptData } from '../../services/utils/utils'
import { setEncryptedCookie } from '../../services/cookie/cookie'

// Hooks
import { useDispatch } from "react-redux";
import { setSession } from "../../hooks/store"; 

const _get_auth = (loader, data, setOpen, setErrorText, navigate, dispatch) => {
    try {
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_CLIEN_ID_GOOGLE,
            callback: (response) => handleCredentialResponse(response, loader, data, setOpen, setErrorText, navigate, dispatch ),
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

const handleCredentialResponse = async (response, loader, data, setOpen, setErrorText, navigate, dispatch ) => {
    loader(true);
    try {
        const decodedToken   = decodeToken(response.credential);
        const dataEmails     = await getDataSheet({sheet_name: "Accesos"})
        const avaibleAccount = await decryptData(String(dataEmails?.data))
        const findUser = JSON.parse(avaibleAccount || [])?.find((item) => item?.correo === decodedToken?.email)
        console.log(decodedToken)
        if (findUser) {
            const data = {
                email: decodedToken?.email,
                id: findUser?.id,
                img: decodedToken?.picture,
                rol: findUser?.rol,
                name: findUser?.name
            }
            setEncryptedCookie('session_vbu', data)
            dispatch(setSession({ isAuth: true, user: data }));
            navigate('/modules')
        } else {
            setOpen(true)
            setErrorText('No tienes Acceso al sistema')
        }

    } catch (error) {
        console.log('error', error);
        setOpen(true)
        setErrorText('Ha ocurrido un error')
    }

    setTimeout(() => {
        loader(false)
    }, 2000)
};

export default () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isload, setIsLoad] =  React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [data, setData] = React.useState([])
    const [errorText, setErrorText] = React.useState('No Tienes Acceso')

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
            _get_auth(setIsLoad, data, setOpen, setErrorText,navigate,dispatch);
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
            <AlertMenssage {...{setOpen,open,errorText, typeLabel: 'error'}} />
        </>
    )
};