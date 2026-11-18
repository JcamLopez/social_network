import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppRouterAuth } from './routes/AppRouterAuth';
import { AppRouterSocial } from './routes/AppRouterSocial'
export const App = () => {
    return (
        <BrowserRouter>

            <AuthProvider>
                <AppRouterAuth />
            </AuthProvider>

            <AppRouterSocial />

        </BrowserRouter>
    );
};

export default App