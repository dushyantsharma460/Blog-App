import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login, logout} from './store/authSlice';
import { Footer , Header } from './components'; 

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({ userData: user }));
        } 
        else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        dispatch({ type: 'SET_USER', payload: null });
      })
      .finally(() => {
        setLoading(false);
      });
  },[dispatch]);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full  block'>
        <Header />
        <main>
          Todo: {/* <Ouutlet />    */}
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center min-h-screen bg-gray-200'>
      <div className='text-2xl text-gray-700'>Loading...</div>
    </div>
  );
}

export default App
