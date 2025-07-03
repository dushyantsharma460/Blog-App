import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  const imageUrl = featuredImage ? appwriteService.getFilePreview(featuredImage) : null;
  
  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="h-48 overflow-hidden bg-gray-100">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
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