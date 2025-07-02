import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="h-48 overflow-hidden">
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex-grow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h2>
          <div className="text-blue-600 font-medium mt-auto">Read more →</div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard