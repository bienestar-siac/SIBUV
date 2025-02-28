// React
import { useState } from "react";
import { useNavigate } from "react-router";

// Material IU
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Avatar,
    IconButton,
    Menu, 
    MenuItem, 
    ListItemIcon, 
    Divider 
} from "@mui/material"
import { AccountCircle, Logout } from "@mui/icons-material"
import CardMedia from '@mui/material/CardMedia';

// Cookie
import Cookies from "js-cookie";

// Styles
import styles from './styles'

// Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSession } from "../../hooks/store"; 

/**
 * Header
 */
export default function Header() {
    const dataUser = useSelector((state) => state.session);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Navigate
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const onCloseSession = () => {
      Cookies.remove("session_token"); 
      dispatch(setSession({ isAuth: false, user: {} }));
      navigate('/')
    }

    console.log(dataUser)
    return (
        <AppBar sx={styles.contPrimary}>
          <Toolbar>
            <Box sx={styles.contLogo}>
              <Box sx={styles.contCardImg}>
                <CardMedia
                  sx={styles.img}
                  component="img"
                  height="100%"
                  widht="100%"
                  image="/logo/logo.jpg"
                  alt="Logo"
                />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={styles.titleHeader}
                >
                  Universidad del Valle
                </Typography>
                <Typography sx={styles.titleHeader} variant="caption" component="div">
                  Vicerrectoría de Bienestar Universitario
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleClick} color="inherit" aria-label="user profile">
              <Avatar sx={{ bgcolor: "gray" }} alt={dataUser?.user?.email || 'U'} src={dataUser.user.img}  />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}>
            <Typography sx={styles.titleMenu} variant="caption" component="div">
              {dataUser?.user?.name}
            </Typography>
            <Divider />
            <MenuItem onClick={onCloseSession}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Cerrar sesión
            </MenuItem>
          </Menu>
          </Toolbar>
        </AppBar>
    )
}