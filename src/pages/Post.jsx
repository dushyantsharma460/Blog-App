import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
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
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = async () => {
        try {
            const status = await appwriteService.deletePost(post.$id);
            if (status) {
                await appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    if (!post) return null;

    return post ? (
    <div className="py-8 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
            
            {isAuthor && (
              <div className="absolute top-4 right-4 flex space-x-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-white">
                    Edit
                  </Button>
                </Link>
                <Button 
                  onClick={deletePost}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
            <div className="prose max-w-none text-gray-700">
              {parse(post.content)}
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}