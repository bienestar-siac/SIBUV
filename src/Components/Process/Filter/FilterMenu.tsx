// React
import React, { useState } from 'react';

// Material IU
import { Box,Button, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Components
import FilterListIcon from '@mui/icons-material/FilterList';

// Styles
import styles from '../styles'

// Handlers
import Handlers from '../../../pages/Process/handlers'

// Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function FilterMenu() {
  // Actions Primarys
  const dispatch = useDispatch();
  const permanent = useSelector((state) => state.process.permanent);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(null);
  const open = Boolean(anchorEl);

  const handlers = Handlers({ dispatch }) 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option: string) => {
    setAnchorEl(null);
    setSelected(option)
    handlers.filterProcess(permanent.filter(
      (item => item?.tipo === option)
    ))
  };

  const restartFilter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelected(null);
    handlers.filterProcess(permanent)
  }

  return (
    <Box>
      <Button
        variant="contained"
        color="error"
        onClick={handleClick}
        sx={selected !== null ? styles.contBtnFilterClose : styles.contBtnFilter}
        startIcon={selected === null ? <FilterListIcon /> : null}
      >
        {selected !== null ? (
          <>
            <span style={styles.spanText}>{selected}</span>
            <CloseIcon onClick={restartFilter} />
          </>
        ) : (
          "Filtro"
        )}
      </Button>

      {/* Menú desplegable */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {setAnchorEl(null)}}
        sx={styles.contMenuFilter}
      >
        <MenuItem onClick={() => handleClose('Seccion')}>Sección</MenuItem>
        <MenuItem onClick={() => handleClose('Programa')}>Programa</MenuItem>
        <MenuItem onClick={() => handleClose('Politica')}>Política</MenuItem>
        <MenuItem onClick={() => handleClose('Area')}>Área</MenuItem>
      </Menu>
    </Box>
  );
}