import React from 'react'
import service from '../appwrite/conf'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-200">
        <img
          src={service.getFilePreview(featuredImage)}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      </div>

    </Link>
  )
}

export default PostCard