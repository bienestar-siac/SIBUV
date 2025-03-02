// React 
import { useNavigate } from "react-router";

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
import CardMedia from '@mui/material/CardMedia';

import modules from './const'

// Styles 
import styles from './styles'

export default function SectionModules() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    
    // Navigate
    const navigate = useNavigate();

    const handlerActions = (path: string) => {
      if (path === '#') 
        return
      
      navigate(path)
    }

    return (
      <Box sx={styles.contModulesPrimary}>
  
        {/* Main Content */}
        <Container sx={{ mt: 8, mb: 8, flexGrow: 1, maxWidth: '1400px !important' }}>
          <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ mb: 6, fontWeight: "bold" }}>
            Módulos
          </Typography>
  
          <Grid container spacing={4} justifyContent="center">
            {modules.map((module, index) => (
              <Grid onClick={() => handlerActions(module.path)} item xs={12} sm={6} md={4} key={index}>
                <Card sx={styles.cardModules}>
                  <CardContent sx={styles.contContentTitle}>
                    <Box sx={styles.contContentModule}>
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
                    </Box>
                    <Box sx={{ mt: "auto" }}>
                        <CardMedia
                            sx={styles.img}
                            component="img"
                            height="100%"
                            widht="100%"
                            image={module.icon}
                            alt="Logo"
                        />
                    </Box>
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