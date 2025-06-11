interface Styles {

}

const styles: Styles = {
    tableRowText: {
        '& span': {
            overflow: 'hidden',
            display: '-webkit-box',
            textOverflow: 'ellipsis', 
            maxWidth: '300px',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
        }
    },
    viewWorker: { 
        width: '-webkit-fill-available', 
        maxWidth: 1300, 
        margin: "0 auto", 
        padding: '24px 0',
        '@media (max-width: 1280px)': {
            padding: '24px',
        }
    },
    circleProgress: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    contOptions: {
        position: 'absolute',
        top: 0,
        right: '25px',
        display: 'flex',
        justifyContent: 'right',
        padding: '20px 0'
    },
    contBtnFilter: {
        display: 'flex',
        alignItems: 'center',
        minWidth: '142px',
        overflow: 'hidden',
        padding: '8px',
        '> span.title': {
            height: '20px'
        }
    },
}

export default styles