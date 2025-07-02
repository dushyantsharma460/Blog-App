import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-gray-700">
                                Login to read posts
                            </h1>
                            <p className="text-gray-500 mt-2">
                                Please sign in to view all the amazing content
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8 bg-gray-50'>
            <Container>
                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-xl font-medium text-gray-600">
                            No posts available. Create one to get started!
                        </h2>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {posts.map((post) => (
                            <div key={post.$id} className='w-full'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;