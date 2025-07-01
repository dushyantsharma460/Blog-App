import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentUser()
            .then((user) => {
                if (user) {
                    dispatch(login({ userData: user }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, [dispatch]);

    return !loading ? (
        <div className='min-h-screen flex flex-col bg-gray-50'>
            <Header />
            <main className='flex-grow'>
                <Outlet />
            </main>
            <Footer />
        </div>
    ) : (
        <div className='flex justify-center items-center min-h-screen'>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
}

export default App;