import { Route, Routes } from 'react-router-dom'
import SocialLayout from '../layouts/SocialLayout'
import { PublicationPage } from '../pages/social/PublicationPage'
export function AppRouterSocial() {
  return (
    <Routes>
      <Route element={<SocialLayout />}>
        <Route path='/' />
        <Route path='/post' element={<PublicationPage />} />
      </Route>
    </Routes>
  )
}


