export default (isListening) => {
    return {
            container: {
                display: "flex",
                flexDirection: "column",
                background: 'white',
                height: 'calc(100vh - 197px)',
                maxWidth: "100%",
                padding: 0,
            },
            header: {
                padding: 2,
                borderBottom: "1px solid #e0e0e0",
                backgroundColor: "#f5f5f5",
            },
            chatArea: {
                flex: 1,
                overflowY: "auto",
                padding: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            },
            footer: {
                padding: 2,
                borderTop: "1px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
            },
            inputField: {
                flex: 1,
            },
            userMessage: {
                alignSelf: "flex-end",
                backgroundColor: "#e3f2fd",
                borderRadius: "18px 18px 4px 18px",
                padding: 2,
                maxWidth: "70%",
            },
            botMessage: {
                alignSelf: "flex-start",
                backgroundColor: "#e8eaf6",
                borderRadius: "18px 18px 18px 4px",
                padding: 2,
                maxWidth: "70%",
            },
            micButton: {
                color: isListening ? "red" : "inherit",
            },
            sendButton: {
                color: "#f44336",
            },
  }
}