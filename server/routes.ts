import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTravelPostSchema, updateTravelPostSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Travel Posts API Routes
  
  // GET /api/posts - Get all travel posts
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await storage.getAllTravelPosts();
      // Transform coordinates back to object for frontend
      const transformedPosts = posts.map(post => ({
        ...post,
        coordinates: post.coordinates ? JSON.parse(post.coordinates) : undefined,
        isLiked: false, // Default for now, can be user-specific later
      }));
      res.json(transformedPosts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  // GET /api/posts/:id - Get a specific travel post
  app.get("/api/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getTravelPost(id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      // Transform coordinates back to object for frontend
      const transformedPost = {
        ...post,
        coordinates: post.coordinates ? JSON.parse(post.coordinates) : undefined,
        isLiked: false, // Default for now, can be user-specific later
      };
      res.json(transformedPost);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  // POST /api/posts - Create a new travel post
  app.post("/api/posts", async (req, res) => {
    try {
      const validatedData = insertTravelPostSchema.parse(req.body);
      const post = await storage.createTravelPost(validatedData);
      
      // Transform coordinates back to object for frontend
      const transformedPost = {
        ...post,
        coordinates: post.coordinates ? JSON.parse(post.coordinates) : undefined,
        isLiked: false,
      };
      res.status(201).json(transformedPost);
    } catch (error) {
      res.status(400).json({ error: "Invalid post data" });
    }
  });

  // PUT /api/posts/:id - Update a travel post
  app.put("/api/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = updateTravelPostSchema.parse(req.body);
      const post = await storage.updateTravelPost(id, validatedData);
      
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      // Transform coordinates back to object for frontend
      const transformedPost = {
        ...post,
        coordinates: post.coordinates ? JSON.parse(post.coordinates) : undefined,
        isLiked: false,
      };
      res.json(transformedPost);
    } catch (error) {
      res.status(400).json({ error: "Invalid update data" });
    }
  });

  // DELETE /api/posts/:id - Delete a travel post
  app.delete("/api/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteTravelPost(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  // POST /api/posts/:id/like - Like a travel post
  app.post("/api/posts/:id/like", async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.likeTravelPost(id);
      
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      // Transform coordinates back to object for frontend
      const transformedPost = {
        ...post,
        coordinates: post.coordinates ? JSON.parse(post.coordinates) : undefined,
        isLiked: true,
      };
      res.json(transformedPost);
    } catch (error) {
      res.status(500).json({ error: "Failed to like post" });
    }
  });

  // POST /api/posts/:id/unlike - Unlike a travel post
  app.post("/api/posts/:id/unlike", async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.unlikeTravelPost(id);
      
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      // Transform coordinates back to object for frontend
      const transformedPost = {
        ...post,
        coordinates: post.coordinates ? JSON.parse(post.coordinates) : undefined,
        isLiked: false,
      };
      res.json(transformedPost);
    } catch (error) {
      res.status(500).json({ error: "Failed to unlike post" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
