// React
import { Fragment, useState } from 'react'

// Redux
import { useSelector } from "react-redux"

export default () => {
    const actividades = useSelector((state) => state.viewProcess.taskList);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [open, setOpen] = useState(false)
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 7));
      setPage(0);
    };
  
    const paginatedData = actividades.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  
    return {
        page,
        actividades,
        rowsPerPage, 
        open, setOpen,
        paginatedData,
        handleChangeRowsPerPage,
        handleChangePage
    }
}