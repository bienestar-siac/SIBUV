# Administrador de Procesos VBU  
Este proyecto sigue un enfoque basado en arquitectura hexagonal, combinando principios de separación de responsabilidades para mejorar la escalabilidad y mantenibilidad.

# 📁 Estructura del Proyecto  

```bash
src/
│── components/       # Componentes reutilizables
│   ├── Home/         # Módulos de la pantalla principal
│   │   ├── Login.tsx # Componente de inicio de sesión
│   │   ├── export.js # Archivo de exportación de componentes
│   ├── Loader/       # Componentes de carga y estado
│
│── pages/            # Páginas principales de la aplicación
│── router/           # Configuración del enrutador
│   ├── Router.tsx    # Definición de rutas
│   ├── main.tsx      # Punto de entrada principal de la aplicación
│
│── interfaces/       # Interfaces y contratos del dominio
│── css/              # Estilos globales
│   ├── root.css      # Estilos base del proyecto
│
│── public/           # Archivos públicos y estáticos
│── dist/             # Archivos compilados para producción
│── .eslintrc.json    # Configuración de ESLint
│── .gitignore        # Archivos ignorados por Git
│── index.html        # Archivo raíz HTML
│── package.json      # Dependencias del proyecto
│── vite.config.js    # Configuración de Vite
│── README.md         # Documentación del proyecto
```

# Tecnologías
- React
- Typescript
