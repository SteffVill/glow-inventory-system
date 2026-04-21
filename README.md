# 💎 Sistema de Gestión de Inventario - Joyería

Este es un sistema diseñado para administrar el inventario de una joyería, permitiendo el control total de piezas, búsqueda avanzada y una interfaz optimizada para el usuario.

## 🚀 Funcionalidades Principales
- **Búsqueda en Tiempo Real:** Filtro inteligente por SKU, Nombre y Categoría desde el buscador principal.
- **Gestión CRUD:** Creación, edición, visualización y eliminación de joyas.
- **Identificación Visual:** Sistema de avatares con iniciales dinámicas para cada producto.
- **Interfaz Premium:** Construida con Tailwind CSS y DaisyUI para un look moderno y responsivo.

## 🛠️ Requisitos e Instalación

### 1. Backend (Servidor Node.js + Express)
El servidor maneja la lógica de negocio y la conexión con la base de datos.
- **Carpeta:** `server/`
- **Instalación:**
  ```bash
  cd server
  npm install
  ```

### 2. Configuración: Crea un archivo .env en la carpeta server/ con los siguientes datos:
    PORT=5000
    DB_HOST=tu_servidor_db
    DB_USER=tu_usuario
    DB_PASSWORD=tu_password
    DB_NAME=nombre_de_tu_bd
### 4. Ejecución: npm start

### 5. Frontend (React + Vite) 
- Entrar a la carpeta: `cd client`
- Instalar librerías: `npm install`
- Iniciar aplicación: `npm run dev`

## ☁️ Despliegue en Producción
- **Frontend:** Alojado en Vercel.
- **Backend:** Alojado en Render / Railway.
- **Variable de Entorno:** Se requiere configurar `VITE_API_URL` en el proveedor de hosting.

👤 Autora- Andreina Villalba Ingeniera en Informática Especialista en Desarrollo Web y UI/UX.
