import { useState, useEffect } from 'react'
import { useRegister } from '../hooks/useRegister'
import type { RegisterPayload } from '../types/auth.types'
import { useGetTypeDocumnet } from '../../typeDocument/hooks/useTypeDocument'
import type { TypeDocument } from '../../typeDocument/types/document.types'
export const RegisterForm = () => {

    const { getTypeDocument, isError: __isDocumentError, isLoading: isDocumentLoading } = useGetTypeDocumnet()
    const { registerUser, isLoading, fieldErrors } = useRegister()
    const [typeDoc, setTypeDoc] = useState<TypeDocument[]>([])
    const [formData, setFormData] = useState<RegisterPayload>({
        email: '',
        password: '',
        document: '',
        typeDoc: 'CC',
        firstName: '',
        middleName: '',
        fullLastName: '',
        age: 0,
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'age' ? Number(value) : value
        }))
    }


    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await registerUser(formData)
        if (response?.data) {
            console.log("¡Usuario registrado con todo su perfil!", response.data);
        }
    }


    useEffect(() => {
        if (isDocumentLoading) {
            const fetchDocuments = async () => {
                const res = await getTypeDocument()

                if (res && res.success && res.data) {
                    setTypeDoc(res.data)
                }
            }
            fetchDocuments()
        }
    }, [])
    return (
        <form onSubmit={handleSubmit} className="grid w-2xl grid-cols-1 md:grid-cols-2 gap-4 p-4 mb-9  rounded-2xl  shadow-sm">
            {/*   <div className='col-span-full flex flex-col'>
                {error && <div className="p-3 mb-3 text-red-700 bg-red-100 rounded w-full">{error}</div>}

                {fieldErrors && (
                    <div className="p-3 text-red-700 bg-red-100 rounded w-full">
                        <p className="font-bold">Por favor corrige los siguientes errores:</p>
                        <ul className="list-disc list-inside">
                           
                            {Object.values(fieldErrors).flat().map((mensaje, index) => (
                                <li key={index}>{mensaje}</li>
                            ))}
                        </ul>
                    </div>
                )}

            </div> */}


            <div className="flex justify-center col-span-full mt-3 mb-3">
                <h2 className="text-2xl font-bold text-center">Crear Cuenta</h2>
            </div>

          

            <div>
                <label htmlFor="doc">Documento</label>
                <input type="number" placeholder="Documento" id="doc" className="w-full px-4 py-1 rounded-sm border border-gray-300  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:scale-95" onChange={handleChange} name='document' required />
            </div>

            <div>
                <label htmlFor="type">Tipo de documento</label>
                <select name="typeDoc" id="type" className={`w-full px-4 py-1 rounded-sm border border-gray-300  placeholder-gray-500 focus:outline-none focus:ring-2 ${fieldErrors?.typedDoc ? 'border-red-500 bg-red-50 focus:border-red-700' : 'focus:ring-blue-500 focus:border-blue-500'}  transition-all shadow-sm hover:scale-95`} onChange={handleChange} value='Tipo documento'>
                    {/*       className={`w-full p-2 border rounded outline-none transition-colors ${fieldErrors?.typedDoc
                            ? 'border-red-500 bg-red-50 focus:border-red-700'
                            : 'border-gray-300 focus:border-blue-500'
                        }`} */}
                    <option value="Tipo documento" >Tipo documento</option>

                    {typeDoc.map((doc) => (
                        <option key={doc.type} value={doc.type}>{doc.type}</option>
                    ))}

                </select>
                {fieldErrors?.typedDoc && (
                    <p className="mt-1 text-sm font-medium text-red-600">
                        {fieldErrors.typedDoc[0]}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="firstName">Primer nombre</label>
                <input type="text" placeholder="Primer nombre" id="firstName" className="w-full px-4 py-1 rounded-sm border border-gray-300  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:scale-95" onChange={handleChange} name='firstName' required />
            </div>

            <div>
                <label htmlFor="middleName">Segundo nombre</label>
                <input type="text" placeholder="Segundo nombre" id="middleName" className="w-full px-4 py-1 rounded-sm border border-gray-300  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:scale-95" name='middleName' onChange={handleChange} />
            </div>


            <div>
                <label htmlFor="lastSecondName">Apellidos</label>
                <input type="text" placeholder="Segundo apellido" id="lastFirstName" className="w-full px-4 py-1 rounded-sm border border-gray-300  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:scale-95" onChange={handleChange} name='fullLastName' required />
            </div>

            <div>
                <label htmlFor="age">Edad</label>
                <input type="number" placeholder="Edad" id="age" className="w-full px-4 py-1 rounded-sm border border-gray-300  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:scale-95" onChange={handleChange} name='age' required />
            </div>
            <div>
                <label htmlFor="user">Usuario</label>
                <input type="email" placeholder="Usuario" id="user" className="w-full px-4 py-1 rounded-sm border border-gray-300  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:scale-95" onChange={handleChange} name='email' required />
            </div>

            <div>
                <label htmlFor="password">Contraseña</label>
                <input type="password" placeholder="Contraseña" id="password" className="w-full px-4 py-1 rounded-sm border border-gray-300  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:scale-95" onChange={handleChange} name='password' required />
            </div>
            <div className="flex justify-end items-end  col-span-full">
                <button className="bg-blue-600 rounded-lg px-4  py-1 w-60 text-white hover:bg-blue-800 hover:scale-95 active:scale-95 transition-colors">{isLoading ? 'Registrando...' : 'Registrarse'}</button>
            </div>
        </form>

    );
};