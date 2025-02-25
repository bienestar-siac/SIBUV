export default {
    contPrimaryLogin: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        bgcolor: "white",
        overflow: "hidden",
    },
    contImgLogo: {
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        height: '100px',
        padding: '15px',
        '@media (max-width: 600px)': {
            // height: '60px',
        }
    },
    img: {
        position: 'fixed',
        top: 15,
        left: 15,
        width: '130px',
        '@media (max-width: 600px)': {
            top: 10,
            left: 10,
            width: '90px',
            height: '80px',
            objectFit: 'contain'
        }
    },
    titlePrimary: {
        mt: 4,
        mb: 8,
        fontWeight: "bold",
        '@media (max-width: 600px)': {
            fontSize: '23px',
            margin: 'unset',
            maxWidth: '60%',
            lineHeight: 'normal'
        },
    },
    contForm: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - (100px + 10vh))',
        '@media (max-width: 600px)': {
            height: 'calc(100vh - (120px + 10vh))',
        }
    },
    recLeft: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "35vw",
        height: "10vh",
        bgcolor: "#ec1c24",
        clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)",
    },
    recRight: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "35vw",
        height: "10vh",
        bgcolor: "#ec1c24",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 10% 100%)",
    },
    contRec: {
        position: 'relative',
        height: "10vh",
        width: '100%'
    },
    contPaper: {
        p: '40px', 
        borderRadius: 2, 
        width: '95%',
        maxWidth: '350px'
    }
}