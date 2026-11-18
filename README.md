# 🚀 Social Network Platform

Una plataforma web Full-Stack moderna y escalable, diseñada con una arquitectura robusta orientada a la seguridad de datos, validación estricta y una experiencia de usuario fluida.

## 💡 Sobre el Proyecto

Este proyecto es una red social interactiva que permite a los usuarios registrarse, publicar y descubrir contenido. Destaca por su implementación de un sistema de registro altamente seguro y tipado de extremo a extremo (End-to-End Type Safety), garantizando que los datos fluyan con un contrato estricto desde la base de datos hasta la interfaz de usuario.

## 🛠️ Tecnologías y Herramientas

**Frontend:**
* **Core:** React con TypeScript (Vite)
* **Peticiones HTTP:** Axios con interceptores y adaptadores de error personalizados
* **Estado y Formularios:** React Hooks (`useState`, Custom Hooks)

**Backend:**
* **Core:** Node.js con Express y TypeScript
* **Validación de Datos:** Zod (Esquemas estrictos y tipado inferido)
* **Base de Datos:** MySQL gestionado con Prisma ORM
* **Arquitectura:** Patrón Controlador-Servicio (MVC) con Middlewares

## ✨ Características Principales y Arquitectura

* **Validación de Esquemas (Zod):** Implementación de un middleware de validación estricta en el backend que bloquea datos corruptos o mal formateados antes de que toquen los controladores o la base de datos.
* **Manejo Centralizado de Errores (Error Adapter Pattern):** Sistema de embudo a través de una clase genérica `AppError<T>`. Los errores de red, de validación (400) y de servidor (500) se capturan, formatean y devuelven al frontend con una estructura única y predecible.
* **Feedback Granular al Usuario:** El frontend mapea los errores de validación directamente debajo del campo específico que falló (ej. "El documento debe contener 10 caracteres" bajo el input correspondiente), mejorando drásticamente la UX.
* **Sincronización de Contratos (DTOs):** Uso de interfaces tipadas compartidas para asegurar que no existan discrepancias en los nombres de las variables entre el cliente y el servidor.

## ⚙️ Arquitectura del Manejo de Errores

El proyecto utiliza un adaptador avanzado en el frontend para estandarizar las respuestas fallidas de la API, manteniendo la seguridad de tipos:

```typescript
export const handleApiError = <T unknown>(error: unknown): AppError<T> => {
    if (error instanceof AxiosError) {
        const responseData = error.response?.data as BackendErrorResponse | undefined;
        const message = responseData?.message || 'Error de comunicación con el servidor';
        const status = error.response?.status || 500;

        return new AppError<T>(message, status, responseData?.errors as T);
    }
    
    if (error instanceof Error) return new AppError<T>(error.message, 500);
    return new AppError('Ocurrió un error inesperado', 500);
};