// React
import { useNavigate } from "react-router";

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

export default function ServicioCard ({ titulo, data, icono, color="#f44336", disabled }: ServicioCardProps) {
    const theme = useTheme()
    // Navigate
    const navigate = useNavigate();

    const handlerClick = (e,link) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (link !== undefined && !disabled)
            navigate(link)
    }

    return (
      <Card 
          sx={{
              ...styles.cardProcess, 
              opacity: disabled? 0.3 : 1,
              cursor: disabled? 'not-allowed' : 'pointer',
          }}
          onClick={(e) => handlerClick(e,`/module/process/${data?.pagina}`)}
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
              {[1, 2, 3].map((num) => {
                const link = data[`enlace_${num}`]
                return (
                    <ListItem
                      onClick={(e) => handlerClick(e,link)}
                      key={num}
                      sx={{
                        ...styles.listItem,
                        cursor: (link === undefined || disabled)? 'not-allowed' : 'pointer',
                        opacity: link !== undefined ? 1 : 0.3
                      }}
                      button
                      component="a"
                      href="#"
                    >
                      <ListItemText
                        primary={`Acceso Rápido ${num}`}
                        sx={styles.listItemText}
                      />
                      {
                        link !== undefined &&
                        <ListItemIcon sx={{ minWidth: "auto", ml: 1 }}>
                          <ChevronRightIcon />
                        </ListItemIcon>
                      }
                    </ListItem>
                )
              })}
            </List>
          </Box>

          <Box sx={styles.cardImg}>
            <CardMedia
                component="img"
                height="100%"
                widht="100%"
                image={serviciosImg[icono]}
                alt="Logo"
                sx={{ opacity: disabled? 0.3 : 1 }}
            />
          </Box>
        </CardContent>
      </Card>
    )
}