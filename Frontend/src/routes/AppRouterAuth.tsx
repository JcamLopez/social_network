import { Routes, Route } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { RegisterPage } from '../pages/auth/RegisterPage';
import LoginPage from '../pages/auth/LoginPage'


export const AppRouterAuth = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>
        </Routes>
    );
};