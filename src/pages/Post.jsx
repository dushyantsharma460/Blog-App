import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <main className="py-10 bg-green-50 bg-opacity-50 min-h-screen">
      <Container>
        <div className="mb-8 border-2 border-green-700 bg-white rounded-xl overflow-hidden shadow-lg relative">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full h-96 object-cover"
          />

          {isAuthor && (
            <div className="absolute top-4 right-4 flex space-x-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-600"
                  className="hover:bg-green-700 shadow-md"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-600"
                className="hover:bg-red-700 shadow-md"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <h1 className="text-3xl font-bold text-green-800 mb-4 text-center">{post.title}</h1>

        <div className="bg-white p-6 rounded-lg border-2 border-green-600 shadow-sm browser-css">
          {parse(post.content)}
        </div>
      </Container>
    </main>
  ) : null;
}
