interface Styles {

}

const styles: Styles = {
    tablePrimary: { 
        width: "100%",
        borderCollapse: "collapse" 
    },
    tableTh: { 
        textAlign: "left", 
        padding: "12px 16px", 
        borderBottom: "1px solid rgba(0,0,0,0.12)" 
    },
    bodyTr: {
        cursor: "pointer", 
        "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } 
    },
    bodyTd: {
        padding: "12px 16px", 
        borderBottom: "1px solid rgba(0,0,0,0.12)" 
    },
    bodyTdEnd: {
        padding: "12px 16px",
        borderBottom: "1px solid rgba(0,0,0,0.12)",
        textAlign: "right",
    }
}

export default styles