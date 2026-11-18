

function Aside() {
    return (
        <div className="flex flex-col">
            <aside className='w-64 bg-white  border-l-4 border-t-2  border-blue-200 overflow-y-auto hidden lg:flex flex-col flex-1'>


                <div className=' p-4 border-b  border-gray-100'>
                    <h2 className='text-lg font-bold text-gray-800'>Juan Lopez</h2>
                </div>


                <nav className='flex flex-col p-2 gap-1 flex-1 '>

                    <button className='flex px-3 py-2  rounded-lg    transition-all  active:scale-75 hover:scale-95 hover:bg-blue-700 bg-blue-600'>
                        <span className='text-white font-medium'>Mi perfil</span>
                    </button>

                    <button className='flex px-3 py-2  rounded-lg    transition-colors active:scale-75 hover:scale-95 hover:bg-blue-700 bg-blue-600'>
                        <span className='text-white font-medium'>Publicaciones</span>
                    </button>

                    <button className='flex px-3 py-2  rounded-lg    transition-colors active:scale-75 hover:scale-95 hover:bg-blue-700 bg-blue-600'>
                        <span className='text-white font-medium'>Contactanos</span>
                    </button>


                </nav>

            </aside>
        </div>
    )
}

export default Aside
