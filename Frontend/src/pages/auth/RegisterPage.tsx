
 import { RegisterForm } from '../../features/auth/components/RegisterForm' 


 export const RegisterPage = () => {
    return (
        <div className="min-h-screen w-full ">
            <main className='mt-10'>
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        Únete a la plataforma
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Publica, interactúa y descubre contenido increíble.
                    </p>
                </div>
                <div className="w-full flex justify-center items-center">
                    <RegisterForm />
                </div>
            </main>
        </div>
    )
}