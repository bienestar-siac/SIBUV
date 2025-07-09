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
import CompromisosPorEstado from '../compromisos-por-estado'
import CompromisosPorPlazo from '../compromisos-por-plazo'
import CompromisosPorResponsable from '../compromisos-por-responsable'

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
    filteredCompromisos,
    responsablesList,
    setResponsablesList,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
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
                    {/* <TextField
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
                    /> */}

                    <FormControl fullWidth>
                        <InputLabel id="sede-label">Sede/Nodo</InputLabel>
                        <Select
                            labelId="sede-label"
                            value={selectedSede}
                            label="Sede/Nodo"
                            onChange={(e) => setSelectedSede(e.target.value)}
                        >
                            <MenuItem value="todas">Todas</MenuItem>
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
                            <MenuItem value="CERRADO">Finalizado</MenuItem>
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
                            <MenuItem value="todos">Todos los Responsables</MenuItem>
                            {responsablesList.map((sede, index) => (
                                <MenuItem key={index} value={sede}>
                                    {sede}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box>
                        <FormControl fullWidth>
                        <TextField
                            label="Fecha inicio"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={startDate ? startDate.toISOString().split("T")[0] : ""}
                            onChange={(e) =>
                            setStartDate(e.target.value ? new Date(e.target.value) : null)
                            }
                        />
                        </FormControl>

                        <FormControl fullWidth sx={{ mt: 2 /* separación opcional */ }}>
                        <TextField
                            label="Fecha fin"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={endDate ? endDate.toISOString().split("T")[0] : ""}
                            onChange={(e) =>
                            setEndDate(e.target.value ? new Date(e.target.value) : null)
                            }
                        />
                        </FormControl>
                    </Box>
                    </Box>
                </Paper>
            </Grid>

            {/* Gráficos */}
            <Grid item xs={12} md={8}>
                <Paper elevation={2} sx={{ p: 3, height: '500px', position: 'relative' }}>
                    <Typography variant="h6" gutterBottom>
                        Visualización
                    </Typography>
                    <Box sx={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs value={tabValue} onChange={handleTabChange} aria-label="visualización tabs">
                            <Tab label="Por Sede" />
                            <Tab label="Por Plazo" />
                            <Tab label="Por Responsable" />
                            </Tabs>
                        </Box>
                        <TabPanel value={tabValue} index={0}>
                            <CompromisosPorEstado {...{
                                filteredCompromisos,
                                sedes
                            }}/>
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <CompromisosPorPlazo {...{
                                filteredCompromisos,
                                sedes
                            }}/>
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            <CompromisosPorResponsable {...{
                                filteredCompromisos,
                            }}/>
                        </TabPanel>
                    </Box>
                    <Box sx={{ position: 'absolute', top: '10px', right: '10px'}}>
                      <a style={{ color: '#eb3e26'}} href="https://lookerstudio.google.com/reporting/4cfa3bca-2b3f-4b22-8d54-234691b7141d" target="_blank">Ver Dashboard</a>
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