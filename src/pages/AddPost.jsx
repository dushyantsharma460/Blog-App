import React from 'react';
import { Container, PostForm } from '../components';

function AddPost() {
  return (
    <main className="min-h-screen py-10 bg-green-50 bg-opacity-50">
      <Container>
        <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">Add New Post</h1>
        <PostForm />
      </Container>
    </main>
  );
}

export default AddPost;
