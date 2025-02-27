// React
import { useState, Fragment } from "react"
import { useNavigate } from "react-router";

// Material IU
import { Box, Button, Container, Divider, TextField, Typography, Link, Paper } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';

// Components
import GoogleLogin from '../../Google/Google'
import Show from '../../Show/Show'
import AlertMenssage from '../../Alerts/Alert'

// Fecth
import { isUserRegistered } from '../../../services/accounts/login'

// Hooks
import { setEncryptedCookie } from '../../../services/cookie/cookie'
import { dataUser } from '../../../hooks/accounts/accounts'
import { useDispatch } from "react-redux";
import { setSession } from "../../../hooks/store"; 

// Styles
import styles from '../styles'

const ERROR_TEXT = 'Upss, parace que hay un error con tu correo o contraseña'

export default function Form() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorText, setErrorText] = useState(ERROR_TEXT)
    const [errors, setErrors] = useState({ email: false, password: false });
    const [isload, setIsLoad] =  useState(false)
    const [open, setOpen] =  useState(false)

    // Navigate
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        let isLoad = false
        setIsLoad(true)

        const newErrors = {
            email: email.trim() === "",
            password: password.trim() === "",
        };

        setErrors(newErrors);

        if (newErrors.email || newErrors.password) return;

        const response = await isUserRegistered({
            "sheet_name": "Accesos",
            "email": email,
            "password": password,
        })
        
        if (response?.isAuth) {
            const user = await dataUser(email)
            console.log(user,"AJMM",email)
            const data = {
                email: email,
                id: user?.id,
                img: null,
                rol: user?.rol,
                name: user?.name
            }
            setEncryptedCookie('session_vbu', data)
            dispatch(setSession({ isAuth: true, user: data }));
            navigate('/modules')
        }

        setOpen(!response?.isAut)
        setIsLoad(false)
    }

    return (
        <Fragment>
            <Container sx={styles.contForm} >
                <Paper elevation={3} sx={styles.contPaper}>
                <form onSubmit={handleSubmit}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <TextField
                            label="Correo electrónico"
                            variant="outlined"
                            fullWidth
                            value={email}
                            error={errors.email}
                            helperText={errors.email ? "Este campo es obligatorio" : ""}
                            sx={{ 
                            'input': {
                                padding: '24px'
                            }
                            }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Contraseña"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            error={errors.password}
                            helperText={errors.password ? "Este campo es obligatorio" : ""}
                            sx={{ 
                            'input': {
                                padding: '24px'
                            }
                        }}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Show when={isload}>
                            <LoadingButton sx={{ ...styles.btnLogin, width: '100%'}} loading variant="outlined">
                                Submit
                            </LoadingButton>
                        </Show>
                        <Show when={!isload}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                sx={styles.btnLogin}
                            >
                                Iniciar Sesion
                            </Button>
                        </Show>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Divider sx={{ flex: 1 }} />
                            <Typography color="text.secondary">O continúa con</Typography>
                            <Divider sx={{ flex: 1 }} />
                        </Box>

                        <GoogleLogin />
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                            <Link sx={{ color: '#f69599'}} href="#" underline="hover">
                            ¿Olvidaste tu contraseña?
                            </Link>
                            |
                            <Link sx={{ color: '#f69599'}} href="#" underline="hover">
                            Ayuda
                            </Link>
                        </Box>
                        </Box>
                    </form>
                </Paper>
            </Container>
            <AlertMenssage  {...{open, setOpen, errorText, typeLabel: 'error'}} />
        </Fragment>
    )
}