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
    contPageLimit: {
        margin: '0 auto',
        width: '-webkit-fill-available',
        maxWidth: '1300px',
        padding: '24px 0',
        '@media (max-width: 1300px)': {
            padding: '24px',
        }
    },
    noFoundPage: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100vh',
        width: '100%'
    },
}

export default styles