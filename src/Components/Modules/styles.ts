interface Styles {

}

const styles: Styles = {
    contPrimary: {
        background: 'white',
    },
    contLogo: { 
        display: "flex", 
        alignItems: "left", 
        flexGrow: 1 
    },
    contCardImg: { 
        mr: 1, 
        position: "relative", 
        width: 60, 
        height: 75
    },
    img: {
        objectFit: 'scale-down'
    },
    titleHeader: {
        lineHeight: '1',
        textAlign: 'center',
        fontWeight: "bold",
        color: '#222',
        px: 1,
    },
    contContentTitle: { 
        flexGrow: 1, 
        display: "flex", 
        // flexDirection: "column", 
        alignItems: "center",
        p: 3 
    },
    titleMenu: {
        padding: '10px',
    },
    cardModules: {
        height: "160px",
        display: "flex",
        // flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 3,
        },
    },
    contModulesPrimary: { 
        display: "flex", 
        flexDirection: "column", 
        minHeight: "100%"
    },
    contContentModule: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default styles