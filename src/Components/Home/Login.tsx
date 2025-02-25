"use client"

// React
import type React from "react"
import { useState } from "react"

// Material IU
import { Box, Button, Typography, Link } from "@mui/material"
import { Google } from "@mui/icons-material"
import CardMedia from '@mui/material/CardMedia';

// Components
import Form from './Form/Form'

// Styles
import styles from './styles'

/**
 * Login Component
 */
export default function LoginPage() {

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
        <Form />
        
        <Box sx={styles.contRec}>
            {/* Diagonal shapes */}
            <Box sx={styles.recLeft} />
            <Box sx={styles.recRight} />
        </Box>
      </Box>
  )
}