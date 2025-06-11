// React
import { Fragment } from 'react'
import { useNavigate } from "react-router";

// Materia IU
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
} from "@mui/material"
import SchemaIcon from '@mui/icons-material/Schema';


export default function Tools() {
    // Navigate
    const navigate = useNavigate();
    const procesosCards = [
        {
            desativar: 'FALSE',
            actividad: 'Automatizacion De Email',
            descricion: 'Procesos',
            path: 'email-automation'
        },
        {
            desativar: false,
            actividad: 'Codigos De Barras',
            descricion: 'Procesos'
        }
    ]

    const handlerNav = (active,path) => {
        if (!active) return
        navigate(`${window.location.pathname}/${path}`)
    }

    return (
    <Fragment>
        {/* Título principal */}    
        <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 3 }}>
            Herramientas
        </Typography>
        {/* Grid de tarjetas de procesos */}
        <Grid 
            container 
            spacing={2} 
            sx={{ 
                mb: 5,
            }}
        >
            {procesosCards.map((card, index) => (
            <Grid onClick={() => handlerNav(card?.desativar === 'FALSE', card.path)}item xs={12} sm={6} md={3} key={index}>
                <Card
                sx={{
                    height: "100%",
                    transition: "box-shadow 0.3s",
                    cursor: card?.desativar === 'FALSE'? 'pointer' : 'not-allowed',
                    opacity: card?.desativar === 'FALSE'? 1 : 0.3, 
                    "&:hover": { boxShadow: 6 },
                }}
                >
                <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                    <Typography variant="h6" component="div">
                        {card?.actividad}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {card?.descricion}
                    </Typography>
                    </Box>
                    <SchemaIcon sx={{ color: 'gray'}} />
                </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>
      </Fragment>
    )
}