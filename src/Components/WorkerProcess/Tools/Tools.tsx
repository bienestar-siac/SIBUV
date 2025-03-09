// React
import { Fragment } from 'react'

// Materia IU
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
} from "@mui/material"
import SchemaIcon from '@mui/icons-material/Schema';

// Redux
import { useSelector } from "react-redux";

export default function Tools() {
    const procesosCards = useSelector((state) => state.viewProcess.tools);

    return (
    <Fragment>
        {/* Título principal */}    
        <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 3 }}>
            Herramientas
        </Typography>
        {/* Grid de tarjetas de procesos */}
        <Grid container spacing={2} sx={{ mb: 5, cursor: 'pointer' }}>
            {procesosCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                sx={{
                    height: "100%",
                    transition: "box-shadow 0.3s",
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