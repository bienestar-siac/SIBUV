// Interfaces
import { ServicioCardProps } from '../../../interfaces/interfaces'

// Material IU
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
import CardMedia from '@mui/material/CardMedia';

// Material Icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

// Styles
import styles from '../styles'

// Conts
import { serviciosImg } from '../conts'

export default function ServicioCard ({ titulo, icono, color="#f44336" }: ServicioCardProps) {
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
            sx={styles.titleProcess}
          >
            {titulo}
          </Typography>
  
          <Box
            sx={{
                position: 'relative',
                widht: '70%'
            }}
          >
            <List sx={{ p: 0 }}>
              {[1, 2, 3].map((num) => (
                <ListItem
                  key={num}
                  sx={{
                    p: 0,
                    mb: 1,
                    maxWidth: '65%',
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
                        textDecoration: 'underline'
                      },
                    }}
                  />
                  <ListItemIcon sx={{ minWidth: "auto", ml: 1 }}>
                    <ChevronRightIcon />
                  </ListItemIcon>
                </ListItem>
              ))}
            </List>
          </Box>

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
            <CardMedia
                component="img"
                height="100%"
                widht="100%"
                image={serviciosImg[icono]}
                alt="Logo"
            />
          </Box>
        </CardContent>
      </Card>
    )
}