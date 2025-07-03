import { users, travelPosts, type User, type InsertUser, type TravelPost, type InsertTravelPost, type UpdateTravelPost } from "@shared/schema";
import { travelPosts as seedData } from "../client/src/data/travelPosts";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Travel posts methods
  getAllTravelPosts(): Promise<TravelPost[]>;
  getTravelPost(id: string): Promise<TravelPost | undefined>;
  createTravelPost(post: InsertTravelPost): Promise<TravelPost>;
  updateTravelPost(id: string, updates: UpdateTravelPost): Promise<TravelPost | undefined>;
  deleteTravelPost(id: string): Promise<boolean>;
  likeTravelPost(id: string): Promise<TravelPost | undefined>;
  unlikeTravelPost(id: string): Promise<TravelPost | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private posts: Map<string, TravelPost>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.currentId = 1;
    
    // Initialize with seed data
    seedData.forEach(post => {
      const travelPost: TravelPost = {
        ...post,
        coordinates: post.coordinates ? JSON.stringify(post.coordinates) : null,
      };
      this.posts.set(post.id, travelPost);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllTravelPosts(): Promise<TravelPost[]> {
    return Array.from(this.posts.values());
  }

  async getTravelPost(id: string): Promise<TravelPost | undefined> {
    return this.posts.get(id);
  }

  async createTravelPost(insertPost: InsertTravelPost): Promise<TravelPost> {
    const id = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const post: TravelPost = {
      ...insertPost,
      id,
      likes: insertPost.likes || 0,
      coordinates: insertPost.coordinates || null,
    };
    this.posts.set(id, post);
    return post;
  }

  async updateTravelPost(id: string, updates: UpdateTravelPost): Promise<TravelPost | undefined> {
    const existingPost = this.posts.get(id);
    if (!existingPost) return undefined;

    const updatedPost: TravelPost = {
      ...existingPost,
      ...updates,
    };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteTravelPost(id: string): Promise<boolean> {
    return this.posts.delete(id);
  }

  async likeTravelPost(id: string): Promise<TravelPost | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;

    const updatedPost: TravelPost = {
      ...post,
      likes: post.likes + 1,
    };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async unlikeTravelPost(id: string): Promise<TravelPost | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;

    const updatedPost: TravelPost = {
      ...post,
      likes: Math.max(0, post.likes - 1),
    };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }
}

export const storage = new MemStorage();
