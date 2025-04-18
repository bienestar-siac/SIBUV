interface Styles {

}

const styles: Styles = {
    titleProcess: {
        mb: 2,
        fontWeight: "bold",
        color: '#f44336',
        fontSize: "1rem",
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 1,
        textTransform: 'uppercase',
        overflow: 'hidden',
    },
    cardProcess: {
        height: "100%",
        borderRadius: "16px",
        border: "1px solid #e0e0e0",
        boxShadow: "none",
        position: "relative",
        overflow: "visible",
    },
    cardImg: {
        position: "absolute",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        color: '#f44336',
        fontSize: "3rem",
    },
    listItem: {
        p: 0,
        mb: 1,
        maxWidth: '65%',
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
          borderRadius: "4px",
        },
    },
    listItemText: {
        "& .MuiListItemText-primary": {
          fontWeight: 500,
          color: "#333",
          textDecoration: 'underline'
        },
    },
    contFilter: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1300px',
        padding: '24px 0 0 0',
        margin: '0 auto',
        '@media (max-width: 1300px)': {
            padding: '50px 24px 0 24px',
        }
    },
    titleModule: {
        fontWeight: 800,
        fontSize: '2em'
    },
    contBtnFilter: {
        minWidth: '142px',
        overflow: 'hidden'
    },
    contMenuFilter: {
        '& .MuiPaper-root': {
           width: '142px',
           '& li': {
              justifyContent: 'center'
           }
        }
    },
    contBtnFilterClose: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-between',
        minWidth: '142px',
        overflow: 'hidden'
    },
    contProcess: { 
        width: '100vw', 
        margin: '0 auto', 
        maxWidth: '1350px', 
        flexGrow: 1, 
        p: 3 
    },
    spanText: {
        height: '19px',
        overflow: 'hidden'
    }
}

export default styles