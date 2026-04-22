# 💎 Sistema de Gestión de Inventario - Joyería

Este es un sistema diseñado para administrar el inventario de una joyería, permitiendo el control total de piezas, búsqueda avanzada y una interfaz optimizada para el usuario.

## 🚀 Funcionalidades Principales
- **Búsqueda en Tiempo Real:** Filtro inteligente por SKU, Nombre y Categoría desde el buscador principal.
- **Gestión CRUD:** Creación, edición, visualización y eliminación de joyas.
- **Identificación Visual:** Sistema de avatares con iniciales dinámicas para cada producto.
- **Interfaz Premium:** Construida con Tailwind CSS y DaisyUI para un look moderno y responsivo.

# 💎 Glow Inventory System

Sistema de inventario para joyería (Fullstack).

## 🚀 Despliegue
- **Frontend:** Vercel
- **Backend:** Render / Railway

## 💻 Configuración Local
1. **Server:** - `npm install`
   - Configura tu `.env` con las credenciales de tu MySQL local.
   - `npm run dev` (Corre en puerto 5000 por defecto).
2. **Client:** - `npm install`
   - `npm run dev` (Se conectará automáticamente a localhost:5000).

## Configurar el Servidor (Backend)

    Entra a la carpeta: cd server
    Instala las dependencias: npm install
    Crea un archivo .env basado en el .env.example con tus credenciales de MySQL local.
    Inicia el servidor: npm run dev

## Configurar el Cliente (Frontend)

    Entra a la carpeta: cd client
    Instala las dependencias: npm install
    Inicia la app: npm run dev
    Nota: El sistema usará automáticamente localhost:5000 para el backend.

## 📍 API REST Endpoints
- `GET /api/products` - Listar todo.
- `POST /api/products` - Crear producto.
- `PUT /api/products/:id` - Editar.
- `DELETE /api/products/:id` - Eliminar.

👤 Autora- Andreina Villalba Ingeniera en Informática Especialista en Desarrollo Web y UI/UX.