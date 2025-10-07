# 🧩 Administrador de Procesos VBU  

Este proyecto sigue un enfoque basado en **arquitectura hexagonal**, combinando principios de **separación de responsabilidades** para mejorar la **escalabilidad**, **mantenibilidad** y **modularidad** del código.

---

## ⚙️ Tecnologías Principales

- ⚛️ **React**
- 🟦 **TypeScript**
- ⚡ **Vite** (para desarrollo rápido)
- 🧱 **Arquitectura Hexagonal**

---

## 📁 Estructura del Proyecto

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

## 🧩 Requisitos Previos

Asegúrate de tener instaladas las siguientes versiones o superiores:

Node.js v20.5.0
npm v9.8.0


Verifica las versiones ejecutando:

node -v
npm -v

## 🚀 Instalación y Configuración

Clona el repositorio:

git clone https://github.com/tu-usuario/administrador-procesos-vbu.git
cd administrador-procesos-vbu


Instala las dependencias:

npm install

Crea el archivo .env en la raíz del proyecto.

```
VITE_CLIEN_ID_GOOGLE=
VITE_ENCRYPTION_KEY=
VITE_SPREEDSHEETID_AGREEMENTS=
VITE_DEEPSEEK_API_KEY=
VITE_APP_EMAILJS_SERVICE_ID=
VITE_APP_EMAILJS_TEMPLATE_ID=
VITE_APP_EMAILJS_USER_ID=
```

Comandos principales:

npm run dev → Inicia el servidor de desarrollo.

npm run build → Genera la versión optimizada para producción.

npm test → Placeholder para pruebas futuras.

## 🌐 Ejecución del Proyecto

Para iniciar el servidor de desarrollo:

npm run dev
