

function NavBar() {
  return (
    <nav className="bg-blue-600 text-white p-2 flex justify-between">
      <h1 className="text-lg font-bold">Mi red social</h1>
      <button className="active:scale-75 hover:scale-95 transition-all">Cerrar Sesión</button>
    </nav>
  )
}

export default NavBar
