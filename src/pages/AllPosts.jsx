import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import { Query } from 'appwrite';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData) {
            appwriteService.getPosts([
                Query.equal("status", "active"),
                Query.equal("userId", userData.$id)
            ]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
        }
    }, [userData]);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
