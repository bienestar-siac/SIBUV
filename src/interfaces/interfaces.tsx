
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