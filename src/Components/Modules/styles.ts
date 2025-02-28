interface Styles {

}

const styles: Styles = {
    contPrimary: {
        background: 'white',
    },
    contLogo: { 
        display: "flex", 
        alignItems: "center", 
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
        flexDirection: "column", 
        alignItems: "center",
        p: 3 
    },
    titleMenu: {
        padding: '10px',
    }
}

export default styles