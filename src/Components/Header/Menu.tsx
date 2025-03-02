// Styles
import styles from './styles'

// Material IU
import {
    Menu, 
    MenuItem, 
    ListItemIcon, 
    Divider,
    Typography
} from "@mui/material"
import { AccountCircle, Logout } from "@mui/icons-material"

type Props = {
    dataUser: object,
    open: boolean,
    handleClose: (e: object) => void,
    onCloseSession: (e: object) => void
    anchorEl: null | HTMLElement
}

/**
 * Menu Header
 */
export default function LoginMenu(props: Props) {
    const { dataUser, anchorEl, open, handleClose, onCloseSession } = props

    return (
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
    )
}