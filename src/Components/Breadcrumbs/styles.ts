interface Styles {

}

const styles: Styles = {
    contBreadcrumbs: {
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
    brecumbsNormal: {
        color: '#333',
        fontWeight: 600
    },
    brecrumbsPremium: {
        fontWeight: 800,
        color: '#eb3e26'
    }
}

export default styles