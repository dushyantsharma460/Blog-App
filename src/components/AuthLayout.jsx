import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate('/login')
    } else if (!authentication && authStatus !== authentication) {
      navigate('/')
    }
    setLoading(false)
  }, [authStatus, navigate, authentication])

  return loading ? (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-purple-900">
      <div className="flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-6 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  ) : (
    <>{children}</>
  )
}
