import { useRef, useState, useEffect } from "react"
import { Fab, Paper, Box, Typography, TextField, IconButton, List, ListItem, Slide, Zoom } from "@mui/material"
import { SmartToy, SentimentSatisfied, Send, Close } from "@mui/icons-material"

// React Router Dom
import { useNavigate } from "react-router";

// MarkDown
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  id: number
  text: string
  sender: "user" | "assistant"
  timestamp: Date
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

// Fecths
import {
    generatePrompIA
} from '../../services/process/Process'

// Prompt 
import PrompDefault from './const'

export default function FloatingChatAssistant() {
  // Navigate
  const navigate = useNavigate();

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        sender: "user",
        timestamp: new Date(),
      }

      setMessages([...messages, newMessage])
      setInputText("")
      console.log(PrompDefault?.promp)
      const iaMessages = [
        { role: "system", content: PrompDefault?.promp },
            ...messages.map(m => ({
                role: (m.sender === 'user') ? "user" : "assistant",
                content: m.text
        })),
        { role: "user", content: inputText }
      ]

      const response = await generatePrompIA({
        model: "deepseek-chat",
        messages: iaMessages,
        max_tokens: 200,
        stream: false,
        temperature: 0.2
      }, 
      {
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
      })

      if (!response.id) throw new Error("Error en la respuesta del servidor")
      const botText = response.choices?.[0]?.message?.content ?? ""

      const navMatch = botText.match(/^navigate\(\s*['"]?(.+?)['"]?\s*\)$/)
      console.log(navMatch,botText)
      if (navMatch) {
        console.log(navMatch)
        const path = navMatch[1]
        navigate(path)                               
      }

      const assistantResponse: Message = {
          id: messages.length + 2,
          text: navMatch ? "Listo ☺️. ¿Te puedo ayudar en algo mas?" : botText,
          sender: "assistant",
          timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantResponse])
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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
                    {message.sender === "assistant" ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({node, ...props}) => <Typography variant="h5" gutterBottom {...props} />,
                          h2: ({node, ...props}) => <Typography variant="h6" gutterBottom {...props} />,
                          h3: ({node, ...props}) => <Typography variant="subtitle1" gutterBottom {...props} />,
                          p: ({node, ...props}) => <Typography variant="body2" sx={{ lineHeight: 1.4 }} paragraph {...props} />,
                          li: ({node, ...props}) => <li {...props} style={{ marginLeft: '1rem' }} />,
                          strong: ({node, ...props}) => <strong {...props} style={{ fontWeight: 600 }} />,
                          code: ({node, ...props}) => <code {...props} style={{ background: '#f4f4f4', padding: '2px 4px', borderRadius: '4px' }} />,
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    ) : (
                      <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                        {message.text}
                      </Typography>
                    )}
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
                  <div ref={messagesEndRef} />
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