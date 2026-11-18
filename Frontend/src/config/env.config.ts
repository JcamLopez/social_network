
export const env = {
    VITE_API_URL:import.meta.env.VITE_API_URL,
} 

if (!env.VITE_API_URL) {
    throw new Error(
        " ERROR CRÍTICO: Falta la variable de entorno VITE_API_URL. " +
        "Asegúrate de tener un archivo .env en la raíz del proyecto."
    )
}
