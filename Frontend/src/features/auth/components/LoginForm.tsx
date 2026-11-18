import type React from "react"
import { useLogin } from '../hooks/useLogin'
import type { LoginPayload } from '../types/auth.types'
import { useState } from "react"








function LoginForm() {
    
    const { login, isLoading, isError } = useLogin()
    const [data, setData] = useState<LoginPayload>({
        email: '',
        password: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await login(data)
        if (response?.success) {
            console.log(response);
        }
    }
    return (

        <form onSubmit={handleSubmit} className="flex flex-col w-md border border-gray-300 shadow-lg rounded-3xl p-12">
             {isError && <div className="p-3 text-red-700 bg-red-100 rounded">{isError}</div>}
            <div className="justify-center items-center mb-4">
                <h1 className="font-medium text-2xl">Iniciar Sesión</h1>
            </div>

            <div className="w-full mb-2">
                <label htmlFor="user">Email</label>
                <input type="email" name="email" id="user" className="w-full border rounded-md border-gray-300 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow transition-all hover:scale-95 " placeholder="Email" onChange={handleChange } />
            </div>

            <div className="w-full">
                <label htmlFor="password">Contraseña</label>
                <input type="password" name="email" id="password" className="w-full border rounded-md border-gray-300 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow transition-all hover:scale-95 " placeholder="Contraseña" onChange={handleChange }/>
            </div>

            <div className="w-full flex justify-end mt-7">
                <button className="bg-blue-600 rounded-lg w-36 text-white active:scale-95 hover:scale-95 py-2 px-3 ">{isLoading ? 'Iniciando...' : 'Iniciar'}</button>
            </div>


        </form>

    )
}

export default LoginForm
