"use client"

import type React from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
} from "@mui/material"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import MedicalServicesIcon from "@mui/icons-material/MedicalServices"
import FavoriteIcon from "@mui/icons-material/Favorite"
import SportsTennisIcon from "@mui/icons-material/SportsTennis"
import RestaurantIcon from "@mui/icons-material/Restaurant"
import FemaleIcon from "@mui/icons-material/Female"
import AccessibleIcon from "@mui/icons-material/Accessible"
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism"
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy"
import PeopleIcon from "@mui/icons-material/People"

interface ServicioCardProps {
  titulo: string
  icono: React.ReactNode
  color: string
}

const ServicioCard: React.FC<ServicioCardProps> = ({ titulo, icono, color }) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "16px",
        border: "1px solid #e0e0e0",
        boxShadow: "none",
        position: "relative",
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: color,
            fontSize: "1rem",
          }}
        >
          {titulo}
        </Typography>

        <List sx={{ p: 0 }}>
          {[1, 2, 3].map((num) => (
            <ListItem
              key={num}
              sx={{
                p: 0,
                mb: 1,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  borderRadius: "4px",
                },
              }}
              button
              component="a"
              href="#"
            >
              <ListItemText
                primary={`Acceso Rápido ${num}`}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 500,
                    color: "#333",
                  },
                }}
              />
              <ListItemIcon sx={{ minWidth: "auto", ml: 1 }}>
                <ChevronRightIcon />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>

        <Box
          sx={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
            color: color,
            fontSize: "3rem",
          }}
        >
          {icono}
        </Box>
      </CardContent>
    </Card>
  )
}

export default function ModuleProcess() {
  const servicios = [
    {
      titulo: "SALUD OCUPACIONAL",
      icono: <MedicalServicesIcon sx={{ fontSize: 60 }} />,
      color: "#f44336",
    },
    {
      titulo: "SALUD ESTUDIANTIL",
      icono: <FavoriteIcon sx={{ fontSize: 60 }} />,
      color: "#f44336",
    },
    {
      titulo: "DEPORTE Y RECREACIÓN",
      icono: <SportsTennisIcon sx={{ fontSize: 60 }} />,
      color: "#f44336",
    },
    {
      titulo: "RESTAURANTE",
      icono: <RestaurantIcon sx={{ fontSize: 60 }} />,
      color: "#f44336",
    },
    {
      titulo: "POLÍTICA INSTITUCIONAL DE IGUALDAD...",
      icono: <FemaleIcon sx={{ fontSize: 60 }} />,
      color: "#f44336",
    },
    {
      titulo: "POLÍTICA DISCAPACIADAD E INCLUSIÓN",
      icono: <AccessibleIcon sx={{ fontSize: 60 }} />,
      color: "#f44336",
    },
    {
      titulo: "POLÍTICA UNIVERSIDAD SALUDABLE",
      icono: <VolunteerActivismIcon sx={{ fontSize: 60 }} />,
      color: "#f44336",
    },
    {
      titulo: "ÁREA DE CULTURA",
      icono: <TheaterComedyIcon sx={{ fontSize: 60 }} />,
      color: "#f44336",
    },
    {
      titulo: "ÁREA ASUNTOS ÉTNICOS",
      icono: <PeopleIcon sx={{ fontSize: 60 }} />,
      color: "#f44336",
    },
  ]

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {servicios.map((servicio, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ServicioCard titulo={servicio.titulo} icono={servicio.icono} color={servicio.color} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}