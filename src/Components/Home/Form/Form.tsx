// React
import { useState } from "react"

// Material IU
import { Box, Button, Container, Divider, TextField, Typography, Link, Paper } from "@mui/material"

// Components
import GoogleLogin from '../../Google/Google'

// Fecth
import { isUserRegistered } from '../../../services/accounts/login'

// Styles
import styles from '../styles'

export default function Form() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({ email: false, password: false });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    
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
        console.log(response)
    }

    return (
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{
                        py: 1,
                        background: '#ec1c24',
                        fontSize: "1rem",
                        }}
                    >
                        Iniciar Sesion
                    </Button>

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
    )
}