import React from 'react'
import { useDispatch } from 'react-redux'
import service from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    service.logout().then(() => {
      dispatch(logout())
    })
  }

  return (
    <button
      onClick={logoutHandler}
      className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-full border border-red-300 hover:bg-red-700 hover:border-red-500 transition-all duration-200"
    >
      Logout
    </button>
  )
}

export default LogoutBtn
