
import { useState } from 'react'
import type { PublicationPayload } from '../types/publication.types'
import { useCretePublication } from '../hooks/usePublication'
export const PublicationForm = () => {

    const { createPublication, error, isLoading } = useCretePublication()

    const [data, setData] = useState<PublicationPayload>({
        title: '',
        description: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await createPublication(data)
        if (response) {
            console.log(response.message)
        }
    }


    return (
        <form onSubmit={handleSubmit} className="w-2xl rounded-2xl px-5 py-5 shadow">
            {error && <div className="p-3 text-red-700 bg-red-100 rounded">{error}</div>}
            <h2 className="font-bold text-3xl flex justify-center">Crea tu publicación</h2>


            <div className="mt-6 mb-3">
                <label htmlFor="title"> Titulo </label>
                <input type="text" id="title" placeholder="Titulo" className="w-full rounded-md border border-gray-200 px-2 py-1 shadow focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500 hover:scale-95 transition-all" name="titulo" onChange={handleChange} />
            </div>
            <div >
                <label htmlFor="desciption"> Descripción </label>
                <textarea id="desciption" placeholder="Descripción" className="w-full rounded-md border border-gray-200 px-2 py-1 shadow focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500 hover:scale-95 transition-all" onChange={handleChange} />
            </div>

            <div className="flex justify-end mt-3">
                <button className="bg-blue-600 text-white py-2 font-semibold rounded-lg text-md w-1/4 active:scale-50 hover:scale-95 transition-all">{isLoading ? 'Creando' : 'Crear'}</button>
            </div>

        </form>
    )
}


