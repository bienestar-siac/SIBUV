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
    container: {
        padding: "20px",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: "32px",
        fontWeight: 600,
        color: "#2c3e50",
        marginBottom: "40px",
        fontFamily: '"Inter", "Poppins", sans-serif',
    },
    formContainer: {
        backgroundColor: "#ffffff",
        padding: "32px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        marginBottom: "40px",
    },
    textField: {
        // marginBottom: "24px",
        height: '100%',
        "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        },
        "& .MuiInputLabel-root": {
        fontFamily: '"Inter", "Poppins", sans-serif',
        fontSize: "14px",
        fontWeight: 500,
        color: "#555",
        },
        "& .MuiOutlinedInput-input": {
        fontFamily: '"Inter", "Poppins", sans-serif',
        fontSize: "14px",
        },
    },
    submitButton: {
        backgroundColor: "#DB3E3E",
        color: "#ffffff",
        padding: "12px 32px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: 600,
        fontFamily: '"Inter", "Poppins", sans-serif',
        textTransform: "none",
        boxShadow: "0 2px 4px rgba(219, 62, 62, 0.2)",
        "&:hover": {
        backgroundColor: "#c53030",
        },
    },
    tableContainer: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        overflow: "hidden",
    },
    tableHeader: {
        backgroundColor: "#f8f9fa",
    },
    tableHeaderCell: {
        fontFamily: '"Inter", "Poppins", sans-serif',
        fontSize: "14px",
        fontWeight: 600,
        color: "#2c3e50",
        padding: "16px",
        borderBottom: "1px solid #e9ecef",
    },
    tableCell: {
        fontFamily: '"Inter", "Poppins", sans-serif',
        fontSize: "14px",
        color: "#495057",
        padding: "16px",
        borderBottom: "1px solid #f1f3f4",
    },
    statusPending: {
        color: "#f39c12",
        fontWeight: 500,
    },
    statusCompleted: {
        color: "#27ae60",
        fontWeight: 500,
    },
    statusFailed: {
        color: "#e74c3c",
        fontWeight: 500,
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: "32px",
        padding: "20px",
    },
    pagination: {
        "& .MuiPaginationItem-root": {
        fontFamily: '"Inter", "Poppins", sans-serif',
        fontSize: "14px",
        },
    }
}

export default styles