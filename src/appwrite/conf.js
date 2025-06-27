import config from "../config/config";

import { Client, ID, Databases, Storage, Query} from "appwrite";

export class AppwriteService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.error("AppwriteService :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } 
        catch (error) {
            console.error("AppwriteService :: updatePost :: error", error);
            return false;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } 
        catch (error) {
            console.error("AppwriteService :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        } 
        catch (error) {
            console.error("AppwriteService :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,    
                queries
            );
        } 
        catch (error) {
            console.error("AppwriteService :: getPosts :: error", error);
            return false;
        }
    }

    // File upload

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } 
        catch (error) {
            console.error("AppwriteService :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(   
                config.appwriteBucketId,
                fileId
            );
            return true;
        } 
        catch (error) {
            console.error("AppwriteService :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        );
    }
}

const service = new AppwriteService();
export default service;