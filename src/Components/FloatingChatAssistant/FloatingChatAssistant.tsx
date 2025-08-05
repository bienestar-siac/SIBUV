"use client"

import type React from "react"
import { useState } from "react"
import { Fab, Paper, Box, Typography, TextField, IconButton, List, ListItem, Slide, Zoom } from "@mui/material"
import { SmartToy, SentimentSatisfied, Send, Close } from "@mui/icons-material"

interface Message {
  id: number
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}


export default function FloatingChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        sender: "user",
        timestamp: new Date(),
      }

      setMessages([...messages, newMessage])
      setInputText("")

      // Simular respuesta del asistente
      setTimeout(() => {
        const assistantResponse: Message = {
          id: messages.length + 2,
          text: "Gracias por tu mensaje. Estoy aquí para ayudarte con cualquier consulta sobre los módulos universitarios.",
          sender: "assistant",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantResponse])
      }, 1000)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  const fabStyles = {
    position: "fixed",
    bottom: 24,
    right: 24,
    zIndex: 1000,
    backgroundColor: "#E53E3E",
    color: "white",
    "&:hover": {
      backgroundColor: "#C53030",
      transform: "scale(1.1)",
    },
    transition: "all 0.3s ease",
    boxShadow: "0 4px 20px rgba(229, 62, 62, 0.3)",
  }

  const chatPanelStyles = {
    position: "fixed",
    bottom: 100,
    right: 24,
    width: 350,
    height: 500,
    zIndex: 999,
    borderRadius: 2,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
    backgroundColor: "white",
  }

  const headerStyles = {
    backgroundColor: "#E53E3E",
    color: "white",
    p: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }

  const messagesContainerStyles = {
    height: 350,
    overflowY: "auto",
    p: 1,
    backgroundColor: "#F7FAFC",
  }

  const userMessageStyles = {
    backgroundColor: "#E53E3E",
    color: "white",
    borderRadius: "18px 18px 4px 18px",
    p: 1.5,
    mb: 1,
    maxWidth: "80%",
    ml: "auto",
    wordWrap: "break-word",
  }

  const assistantMessageStyles = {
    backgroundColor: "white",
    color: "#2D3748",
    borderRadius: "18px 18px 18px 4px",
    p: 1.5,
    mb: 1,
    maxWidth: "80%",
    mr: "auto",
    border: "1px solid #E2E8F0",
    wordWrap: "break-word",
  }

  const inputContainerStyles = {
    p: 2,
    backgroundColor: "white",
    borderTop: "1px solid #E2E8F0",
    display: "flex",
    alignItems: "center",
    gap: 1,
  }

  const textFieldStyles = {
    flex: 1,
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      "& fieldset": {
        borderColor: "#E2E8F0",
      },
      "&:hover fieldset": {
        borderColor: "#E53E3E",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#E53E3E",
      },
    },
  }

  const sendButtonStyles = {
    backgroundColor: "#E53E3E",
    color: "white",
    "&:hover": {
      backgroundColor: "#C53030",
    },
    "&:disabled": {
      backgroundColor: "#CBD5E0",
      color: "#A0AEC0",
    },
  }

  return (
    <>
      {/* Floating Action Button */}
      <Zoom in={true}>
        <Fab
          sx={fabStyles}
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? <SentimentSatisfied /> : <SmartToy />}
        </Fab>
      </Zoom>

      {/* Chat Panel */}
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Paper sx={chatPanelStyles}>
          {/* Header */}
          <Box sx={headerStyles}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SmartToy />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Asistente Virtual
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: "white" }}>
              <Close />
            </IconButton>
          </Box>

          {/* Messages Container */}
          <Box sx={messagesContainerStyles}>
            <List sx={{ p: 0 }}>
              {messages.map((message) => (
                <ListItem key={message.id} sx={{ p: 0, mb: 1 }}>
                  <Box sx={message.sender === "user" ? userMessageStyles : assistantMessageStyles}>
                    <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                      {message.text}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        opacity: 0.7,
                        fontSize: "0.7rem",
                        mt: 0.5,
                        display: "block",
                      }}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Input Container */}
          <Box sx={inputContainerStyles}>
            <TextField
              fullWidth
              size="small"
              placeholder="Escribe tu mensaje..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={textFieldStyles}
              multiline
              maxRows={3}
            />
            <IconButton onClick={handleSendMessage} disabled={!inputText.trim()} sx={sendButtonStyles}>
              <Send />
            </IconButton>
          </Box>
        </Paper>
      </Slide>
    </>
  )
}