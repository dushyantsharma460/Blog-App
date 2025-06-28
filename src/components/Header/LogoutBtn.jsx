import React from 'react'
import { useDispatch } from 'react-redux'
import service from '../../appwrite/conf'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        service.logout().then(() => {
            dispatch(logout());
        })
    }
  return (
    <button className='btn btn-danger' onClick={logoutHandler}>
        Logout
    </button>
  )
}

export default LogoutBtn