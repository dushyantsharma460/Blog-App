import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import service from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if (file) {
                service.deleteFile(post.featuredImage);
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await service.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await service.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {post ? 'Edit Post' : 'Create New Post'}
                </h2>
                <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
            </div>

            <div className="flex flex-wrap -mx-3">
                <div className="w-full lg:w-2/3 px-3">
                    <Input
                        label="Title"
                        placeholder="Enter post title"
                        className="mb-6"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug"
                        placeholder="Enter post slug"
                        className="mb-6"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE 
                        label="Content" 
                        name="content" 
                        control={control} 
                        defaultValue={getValues("content")}
                    />
                </div>

                <div className="w-full lg:w-1/3 px-3">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <Input
                            label="Featured Image"
                            type="file"
                            className="mb-6"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                        
                        {post && (
                            <div className="w-full mb-6 rounded-lg overflow-hidden border border-gray-200">
                                <img
                                    src={service.getFilePreview(post.featuredImage)}
                                    alt={post.title}
                                    className="w-full h-auto"
                                />
                            </div>
                        )}

                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            className="mb-6"
                            {...register("status", { required: true })}
                        />

                        <Button 
                            type="submit" 
                            bgColor={post ? "bg-blue-600" : "bg-green-600"}
                            className="w-full"
                        >
                            {post ? 'Update Post' : 'Publish Post'}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}