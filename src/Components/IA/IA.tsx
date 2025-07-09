import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button, Box, TextField, IconButton, Paper, Typography, Container } from "@mui/material"
import MicIcon from "@mui/icons-material/Mic"
import SendIcon from "@mui/icons-material/Send"

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"

// Styles 
import Styles from './styles'
import PrompDefault from './const'

import {
    generatePrompIA
} from '../../services/process/Process'

interface Message {
  text: string
  isUser: boolean
  timestamp: Date
}

export default function ChatInterfaceIA(): React.FC {
    const [messages, setMessages] = useState<Message[]>([])
    const [inputText, setInputText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const mediaRecorderRef = useRef<MediaRecorder>()
    const recordedChunksRef = useRef<Blob[]>([])
    const [comprimos, setComprimos] = useState("General")
    const styles = Styles(isRecording)
    console.log(PrompDefault)
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        const SpeechRecognitionConstructor =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition

        if (!SpeechRecognitionConstructor) {
            console.warn('Web Speech API no disponible')
            return
        }

        const recognition: SpeechRecognition = new SpeechRecognitionConstructor()
        recognition.lang = 'es-CO'
        recognition.interimResults = false
        recognition.maxAlternatives = 1

        recognition.onresult = (e: SpeechRecognitionEvent) => {
            const text = e.results[0][0].transcript
            setInputText(text)     // Aquí pones el texto en tu input
            setIsRecording(false)
        }
        recognition.onerror = () => setIsRecording(false)

        recordedChunksRef.current = recognition
    }, [])

    const toggleRecording = () => {
    if (!recordedChunksRef.current) return

    if (isRecording) {
        recordedChunksRef.current.stop()
        setIsRecording(false)
    } else {
        recordedChunksRef.current.start()
        setIsRecording(true)
    }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value)
    }

    const handleSend = async () => {
        if (!inputText.trim()) return

        // 1) Añadir mensaje del usuario al estado
        const userMessage: Message = {
            text: inputText,
            isUser: true,
            timestamp: new Date(),
        }
        setMessages(prev => [...prev, userMessage])
        setInputText("")
        setIsLoading(true)

        try {

            const iaMessages = [
            { role: "system", content: PrompDefault?.promp },
            ...messages.map(m => ({
                role: m.isUser ? "user" : "assistant",
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
            const botMessage: Message = {
            text: botText,
            isUser: false,
            timestamp: new Date(),
            }
            setMessages(prev => [...prev, botMessage])

        } catch (error) {
            console.error("Error al enviar mensaje:", error)
            setMessages(prev => [
            ...prev,
            {
                text: "Lo siento, ha ocurrido un error al procesar tu mensaje.",
                isUser: false,
                timestamp: new Date(),
            }
            ])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSend()
        }
    }

    return (
        <Container sx={styles.container}>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-start', marginTop: '20px'}}>
            <FormControl fullWidth size="small">
                {/* La “etiqueta” del campo */}
                <InputLabel id="comprimos-label">Comprimos</InputLabel>
                <Select
                    labelId="comprimos-label"
                    sx={{ width: '300px'}}
                    id="comprimos-select"
                    value={comprimos}
                    label="Comprimos" 
                    onChange={(e) => setComprimos(e.target.value)}
                >
                    {/* única opción disponible */}
                    <MenuItem value="General">General</MenuItem>
                    <MenuItem value="1">Acuerdos y Compromisos</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Box sx={styles.chatArea}>
            {messages.map((message, index) => (
            <Paper key={index} elevation={1} sx={message.isUser ? styles.userMessage : styles.botMessage}>
                <Typography variant="body1">{message.text}</Typography>
            </Paper>
            ))}
            <div ref={messagesEndRef} />
        </Box>

        <Box sx={styles.footer}>
            <IconButton onClick={toggleRecording} sx={styles.micButton} aria-label="Activar micrófono">
            <MicIcon />
            </IconButton>
            <TextField
            variant="outlined"
            placeholder="Escribe un mensaje..."
            fullWidth
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            sx={styles.inputField}
            size="small"
            />
            <IconButton
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
            sx={styles.sendButton}
            aria-label="Enviar mensaje"
            >
            <SendIcon />
            </IconButton>
        </Box>
        </Container>
    )
}