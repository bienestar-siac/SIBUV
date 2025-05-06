// Material IU
import {
    Grid,
    Paper,
    Typography,
    LinearProgress,
} from "@mui/material"

// Total Agreements
export default function TotalAgreements({ 
    dataAgreements, 
    compromisosEnEjecucion, 
    porcentajeEjecucion, 
    porcentajePendientes,
    compromisosFinalizados,
    porcentajeFinalizados,
    compromisosPendientes,
    totalCompromisosFiltered,
}) {
    return (
        <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={3}>
                <Paper elevation={2} sx={{ p: 2, height: '136px'}}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Total Compromisos
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                        {totalCompromisosFiltered}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Compromisos registrados
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        En Ejecución
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                        {compromisosEnEjecucion}
                    </Typography>
                    <LinearProgress variant="determinate" value={porcentajeEjecucion} sx={{ my: 1 }} />
                    <Typography variant="caption" color="text.secondary">
                        {Number(((porcentajeEjecucion)).toFixed(2))}% del total
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Pendientes
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                        {compromisosPendientes}
                    </Typography>
                    <LinearProgress variant="determinate" value={porcentajePendientes} sx={{ my: 1 }} />
                    <Typography variant="caption" color="text.secondary">
                        {(Number(porcentajePendientes).toFixed(2))}% del total
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Finalizados
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                        {compromisosFinalizados}
                    </Typography>
                    <LinearProgress variant="determinate" value={porcentajeFinalizados} sx={{ my: 1 }} color="success" />
                    <Typography variant="caption" color="text.secondary">
                    {(Number(porcentajeFinalizados).toFixed(2))}% del total
                    </Typography>
                </Paper>
            </Grid>
      </Grid>
    )
}