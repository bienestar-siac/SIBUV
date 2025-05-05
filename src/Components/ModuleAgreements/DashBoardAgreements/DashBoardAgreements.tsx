// Material IU
import {
    Grid,
    Paper,
    Typography,
    Box,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Tabs,
    Tab,
} from "@mui/material"

// Material Icons
import {
    Search as SearchIcon,
} from "@mui/icons-material"

// Interface
import { TabPanelProps } from '../../../interfaces/interfaces'

export default function DashBoardAgreements({
    searchQuery,
    selectedSede,
    setSelectedSede,
    sedes,
    selectedEstado,
    setSelectedEstado,
    selectedResponsable,
    setSelectedResponsable,
    handleTabChange,
    tabValue,
}) {
    return (
        <Grid container spacing={3} sx={{ mb: 3 }}>
            {/* Filtros */}
            <Grid item xs={12} md={4}>
                <Paper elevation={2} sx={{ p: 3, height: '500px' }}>
                    <Typography variant="h6" gutterBottom>
                        Filtros
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <TextField
                        label="Buscar compromiso"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        }}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="sede-label">Sede/Nodo</InputLabel>
                        <Select
                            labelId="sede-label"
                            value={selectedSede}
                            label="Sede/Nodo"
                            onChange={(e) => setSelectedSede(e.target.value)}
                        >
                        <MenuItem value="todas">Todas las sedes</MenuItem>
                            {sedes.map((sede, index) => (
                                    <MenuItem key={index} value={sede}>
                                    {sede}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="estado-label">Estado</InputLabel>
                        <Select
                            labelId="estado-label"
                            value={selectedEstado}
                            label="Estado"
                            onChange={(e) => setSelectedEstado(e.target.value)}
                            >
                            <MenuItem value="todos">Todos los estados</MenuItem>
                            <MenuItem value="EN EJECUCIÓN">En ejecución</MenuItem>
                            <MenuItem value="PENDIENTE">Pendiente</MenuItem>
                            <MenuItem value="FINALIZADO">Finalizado</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="responsable-label">Responsable</InputLabel>
                        <Select
                            labelId="responsable-label"
                            value={selectedResponsable}
                            label="Responsable"
                            onChange={(e) => setSelectedResponsable(e.target.value)}
                            >
                            <MenuItem value="todos">Todos los responsables</MenuItem>
                            <MenuItem value="Juan Pérez">Juan Pérez</MenuItem>
                            <MenuItem value="María López">María López</MenuItem>
                            <MenuItem value="Carlos Rodríguez">Carlos Rodríguez</MenuItem>
                            <MenuItem value="Ana Martínez">Ana Martínez</MenuItem>
                        </Select>
                    </FormControl>

                    <Box>
                        <Typography variant="subtitle2" gutterBottom>
                            Rango de fechas
                        </Typography>
                        {/* <DatePickerWithRange /> */}
                    </Box>
                    </Box>
                </Paper>
            </Grid>

            {/* Gráficos */}
            <Grid item xs={12} md={8}>
                <Paper elevation={2} sx={{ p: 3, height: '500px' }}>
                    <Typography variant="h6" gutterBottom>
                        Visualización
                    </Typography>
                    <Box sx={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs value={tabValue} onChange={handleTabChange} aria-label="visualización tabs">
                            <Tab label="Por Estado" />
                            <Tab label="Por Plazo" />
                            <Tab label="Por Responsable" />
                            </Tabs>
                        </Box>
                        <TabPanel value={tabValue} index={0}>
                            {/* <CompromisosPorEstado /> */}
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            {/* <CompromisosPorPlazo /> */}
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            {/* <CompromisosPorResponsable /> */}
                        </TabPanel>
                    </Box>
                </Paper>
            </Grid>
      </Grid>
    )
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3, height: 300 }}>{children}</Box>}
      </div>
    )
}  