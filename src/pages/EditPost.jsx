import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import service from '../appwrite/conf';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate('/');
        }
        setLoading(false);
      });
    } else {
      navigate('/');
      setLoading(false);
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-green-50 bg-opacity-50">
        <p className="text-green-700 font-semibold text-lg animate-pulse">Loading post...</p>
      </main>
    );
  }

  return (
    <main className="py-10 bg-green-50 bg-opacity-50 min-h-screen">
      <Container>
        <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">Edit Post</h1>
        <PostForm post={post} />
      </Container>
    </main>
  );
}

export default EditPost;
