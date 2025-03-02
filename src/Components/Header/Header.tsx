// React
import React, { useState } from "react";
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
import { AccountCircle } from "@mui/icons-material"
import CardMedia from '@mui/material/CardMedia';

// Styles
import styles from './styles'

// Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSession } from "../../hooks/store"; 

// Components
import LoginMenu from './Menu'

// Hbalders
import Handlers from './handlers'

/**
 * Header
 */
export default function Header() {
    const dataUser = useSelector((state) => state.session);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Navigate
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlers = Handlers({    
      setAnchorEl,
      dispatch,
      setSession,
      navigate
    })

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
            <IconButton onClick={handlers.handleClick} color="inherit" aria-label="user profile">
              <Avatar sx={{ bgcolor: "gray" }} alt={dataUser?.user?.email || 'U'} src={dataUser.user.img}  />
            </IconButton>
            <LoginMenu {...{dataUser, anchorEl, open, handleClose: handlers.handleClose, onCloseSession: handlers.onCloseSession}} />
          </Toolbar>
        </AppBar>
    )
}