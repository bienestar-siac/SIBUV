import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function FilterMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Botón que activa el menú */}
      <Button
        variant="contained"
        color="error"
        startIcon={<FilterListIcon />}
        onClick={handleClick}
      >
        Filtro
      </Button>

      {/* Menú desplegable */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Sección</MenuItem>
        <MenuItem onClick={handleClose}>Programa</MenuItem>
        <MenuItem onClick={handleClose}>Política</MenuItem>
        <MenuItem onClick={handleClose}>Área</MenuItem>
      </Menu>
    </div>
  );
}