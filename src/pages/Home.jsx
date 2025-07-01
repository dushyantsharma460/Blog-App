import React, { useEffect, useState } from 'react'
import service from '../appwrite/conf'
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <h1 className='text-2xl font-bold text-gray-800 mb-4'>Welcome to Dushyant Blog</h1>
                            <p className="text-gray-600">No posts available yet.</p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Latest Posts</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home