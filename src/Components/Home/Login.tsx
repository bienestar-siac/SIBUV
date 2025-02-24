"use client"

// React
import type React from "react"
import { useState } from "react"

// Material IU
import { Box, Button, Container, Divider, TextField, Typography, Link, Paper, ThemeProvider } from "@mui/material"
import { Google } from "@mui/icons-material"
import CardMedia from '@mui/material/CardMedia';

// Components
import GoogleLogin from '../Google/Google'

// Styles
import styles from './styles'

/**
 * Login Component
 */
export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
      <Box sx={styles.contPrimaryLogin}>
        {/* Logo */}
        <Box sx={styles.contImgLogo} >
            <CardMedia
                sx={styles.img}
                component="img"
                height="165"
                image="/logo/logo.jpg"
                alt="Paella dish"
            />
            
            {/* Title */}
            <Typography
                variant="h4"
                component="h1"
                align="center"
                sx={styles.titlePrimary}
            >
                Vicerrectoría de Bienestar Universitario - <span style={{ color: "#E31837" }}>VBU</span>
            </Typography>
        </Box>

        {/* Login Form */}
        <Container sx={styles.contForm} >
          <Paper 
            elevation={3} 
            sx={{
                p: '40px', 
                borderRadius: 2, 
                width: '95%',
                maxWidth: '350px'
            }}
        >
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  label="Correo electrónico"
                  variant="outlined"
                  fullWidth
                  value={email}
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
                    py: 1.5,
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

                {/* <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Google />}
                  sx={{
                    py: 1.5,
                    color: "text.primary",
                    borderColor: "divider",
                  }}
                >
                  Acceder con Google
                </Button> */}
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

        <Box
            sx={{
                position: 'relative',
                height: "10vh",
                width: '100%'
            }}
        >
            {/* Diagonal shapes */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "35vw",
                    height: "10vh",
                    bgcolor: "#ec1c24",
                    clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "35vw",
                    height: "10vh",
                    bgcolor: "#ec1c24",
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 10% 100%)",
                }}
            />
        </Box>
      </Box>
  )
}