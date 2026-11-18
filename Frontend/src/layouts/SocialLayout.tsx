import { Outlet } from 'react-router-dom'
import NavBarSocial from '../features/social/components/NavBar'
import AsideSocial from '../features/social/components/Aside'
function SocialLayout() {
  return (
    <main className='w-full min-h-screen flex flex-col'>
      <NavBarSocial />


      <div className='flex flex-1 w-full overflow-hidden '>
        <section className='flex-1 overflow-y-auto'>
          <Outlet />
        </section>
        <AsideSocial />
      </div>
    </main>
  )
}

export default SocialLayout