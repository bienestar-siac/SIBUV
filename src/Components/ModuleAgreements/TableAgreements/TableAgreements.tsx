// Material IU
import {
    Paper,
    Typography,
    Box,
    Pagination,
    table,
    thead,
    tr,
    th,
    tbody,
    td,
    IconButton,
} from "@mui/material"

// Icons
import ChevronDownIcon from "@mui/icons-material/KeyboardArrowDown"; 

// Styles
import styles from '../styles'

// TableAgreements
export default function TableAgreements({
    filteredCompromisos,
    paginatedData,
    setSelectedCompromiso,
    getPlazoChip,
    getEstadoChip,
    page,
    handleChangePage,
    rowsPerPage,
}) {
    return (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                Compromisos y Acuerdos
            </Typography>
            <Box sx={{ overflowX: "auto" }}>
            {filteredCompromisos.length === 0 ? (
                <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography color="text.secondary">
                    No se encontraron compromisos con los filtros seleccionados
                </Typography>
                </Box>
            ) : (
                <table style={styles.tablePrimary}>
                    <thead>
                        <tr>
                        <th style={styles.tableTh}>
                            Actividad
                        </th>
                        <th style={styles.tableTh}>
                            Fecha
                        </th>
                        <th style={styles.tableTh}>
                            Estado
                        </th>
                        <th style={styles.tableTh}>
                            Sede
                        </th>
                        <th style={styles.tableTh}>
                            Responsable
                        </th>
                        <th style={styles.tableTh}>
                            Plazo
                        </th>
                        <th style={styles.tableTh}>
                            Acciones
                        </th>
                        </tr>
                    </thead>
                    <tbody >
                        {paginatedData.map((compromiso) => (
                        <tr
                            key={compromiso.id}
                            onClick={() => setSelectedCompromiso(compromiso)}
                            style={styles.bodyTr}
                        >
                            <td style={styles.bodyTd}>
                            <Typography fontWeight="medium">{compromiso['compromisos / acuerdos'] ?? 'No tiene Compromiso'}</Typography>
                            </td>
                            <td style={styles.bodyTd}>
                                {compromiso['fecha de seguimiento'] ?? 'No definida'}
                            </td>
                            <td style={styles.bodyTd}>
                                {getEstadoChip(compromiso.estado)}
                            </td>
                            <td style={styles.bodyTd}>
                                {compromiso['sedes/nodos']}
                            </td>
                            <td style={styles.bodyTd}>
                                {compromiso['responsable 1']}
                            </td>
                            <td style={styles.bodyTd}>
                                {getPlazoChip(compromiso['plazo de ejecución'] || 'No Definido')}
                            </td>
                            <td
                            style={styles.bodyTdEnd}
                            >
                                <IconButton size="small">
                                    <ChevronDownIcon fontSize="small" />
                                </IconButton>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* Paginación */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Pagination
                    count={Math.ceil(filteredCompromisos.length / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                />
            </Box>
            </Box>
      </Paper>
    )
}