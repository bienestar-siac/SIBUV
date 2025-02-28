// Material IU
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Card,
    CardContent,
    Grid,
    Box,
    Avatar,
    IconButton,
    useMediaQuery,
    useTheme,
} from "@mui/material"
import { AccountCircle } from "@mui/icons-material"

import modules from './const'

// Styles 
import styles from './styles'

export default function SectionModules() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  
    return (
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100%", bgcolor: "#f5f5f5" }}>
  
        {/* Main Content */}
        <Container maxWidth="lg" sx={{ mt: 8, mb: 8, flexGrow: 1 }}>
          <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ mb: 6, fontWeight: "bold" }}>
            Módulos
          </Typography>
  
          <Grid container spacing={4} justifyContent="center">
            {modules.map((module, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardContent sx={styles.contContentTitle}>
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      align="center"
                      sx={{
                        color: module.color,
                        fontWeight: "bold",
                        mb: 2,
                      }}
                    >
                      {module.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                      {module.subtitle}
                    </Typography>
                    <Box sx={{ mt: "auto" }}>IMG</Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
  
          <Typography variant="body1" align="center" sx={{ mt: 8, color: "text.secondary" }}>
            Haga clic en cualquier módulo para acceder a sus funcionalidades
          </Typography>
        </Container>
      </Box>
    )
}