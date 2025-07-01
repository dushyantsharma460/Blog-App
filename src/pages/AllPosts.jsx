import React, { useState, useEffect } from 'react';
import service from '../appwrite/conf';
import { Container, PostCard } from '../components';

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-10 bg-green-50 bg-opacity-50 min-h-screen">
      <Container>
        {posts.length > 0 ? (
          <div className="flex flex-wrap -mx-4">
            {posts.map((post) => (
              <div key={post.$id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-green-800 text-lg font-medium">
            No posts found.
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
