import type React from "react"

export type ShowType = {
    when: boolean
    children: JSX.Element
}

export interface ServicioCardProps {
    titulo: string
    icono: React.ReactNode
    color: string
}

export interface CrearInformeModalProps {
    open: boolean
    onClose: () => void
    workPlan?: { url: string }
}

export interface Informe {
    id: string
    fecha: string
    editor: string
    estado: "completado" | "pendiente" | "revisión"
}

export interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}