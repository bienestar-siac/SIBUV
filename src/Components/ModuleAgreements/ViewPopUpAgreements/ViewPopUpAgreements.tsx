// Material IU
import {
    Dialog, 
    DialogTitle, 
    DialogContent,
    Box,
    Typography,
    Button,
    IconButton,
    Grid,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close";

// ViewPopUpAgreements
export default function ViewPopUpAgreements({
    setSelectedCompromiso,
    getEstadoChip,
    getPlazoChip,
    selectedCompromiso
}) {
    return (
        <Dialog
            open={Boolean(selectedCompromiso)}
            onClose={() => setSelectedCompromiso(null)}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
                Detalles del Compromiso
                <IconButton sx={{ ml: "auto" }} onClick={() => setSelectedCompromiso(null)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Box>
                        <Typography variant="body2" color="text.secondary">
                            {selectedCompromiso?.['compromisos / acuerdos'] || ''}
                        </Typography>
                        </Box>
                    </Box>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                            Información General
                        </Typography>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 1 }}>
                            <Typography variant="body2" fontWeight="medium">
                                Fecha:
                            </Typography>
                            <Typography variant="body2">
                                {selectedCompromiso?.['fecha de seguimiento'] || ''}
                            </Typography>

                            <Typography variant="body2" fontWeight="medium">
                                Estado:
                            </Typography>
                            <Box>{getEstadoChip(selectedCompromiso?.estado)}</Box>

                            <Typography variant="body2" fontWeight="medium">
                                Sede:
                            </Typography>
                            <Typography variant="body2">{selectedCompromiso?.['sedes/nodos']}</Typography>

                            <Typography variant="body2" fontWeight="medium">
                                Responsable:
                            </Typography>
                            <Typography variant="body2">{selectedCompromiso?.['responsable 1']}</Typography>

                            <Typography variant="body2" fontWeight="medium">
                                Plazo:
                            </Typography>
                            <Box>{getPlazoChip(selectedCompromiso?.['plazo de ejecución'] || '')}</Box>
                        </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                            Detalles y Observaciones
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" fontWeight="medium">
                                Detalles:
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'flex'}}>
                                {selectedCompromiso?.['observaciones']}
                            </Typography>
                        </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                        <Button variant="outlined">Editar</Button>
                    </Box>
            </DialogContent>
        </Dialog>
    )
}