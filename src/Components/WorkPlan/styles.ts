interface Styles {

}

const styles: Styles = {
    contPrimary: {
        display: 'flex',
        flexDirection: 'column',
        background: '#f5f5f5',
        minHeight: 'calc(100vh - 70px)',
        marginTop: '70px'
    },
    noFoundPage: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100vh',
        width: '100%'
    },
    contPageLimit: {
        margin: '0 auto',
        width: '-webkit-fill-available',
        maxWidth: '1300px',
        padding: '24px 0',
        '@media (max-width: 1300px)': {
            padding: '24px',
        }
    },
    contIframe: {
        height: '70vh'
    },
    contCardTabs: {
        minHeight: '70vh'
    },
    contOptions: {
        display: 'flex',
        justifyContent: 'right',
        padding: '20px 0'
    },
    contBtnFilter: {
        display: 'flex',
        alignItems: 'center',
        minWidth: '142px',
        overflow: 'hidden',
        '> span.title': {
            height: '20px'
        }
    },
}

export default styles