import { 
  users, type User, type InsertUser, 
  type InsertProxyRequest, type ProxyRequest, 
  proxyRequests 
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  logProxyRequest(request: InsertProxyRequest): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private proxyRequests: Array<ProxyRequest>;
  currentId: number;
  currentProxyId: number;

  constructor() {
    this.users = new Map();
    this.proxyRequests = [];
    this.currentId = 1;
    this.currentProxyId = 1;
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
  
  async logProxyRequest(request: InsertProxyRequest): Promise<void> {
    const id = this.currentProxyId++;
    // Ensure all required properties are properly set with correct types
    const proxyRequest: ProxyRequest = { 
      ...request, 
      id,
      userId: request.userId ?? null,
      success: request.success ?? true,
      errorMessage: request.errorMessage ?? null
    };
    this.proxyRequests.push(proxyRequest);
    // Log to console for debugging
    console.log(`Proxy request logged: ${request.url}, success: ${request.success}`);
  }
}

export const storage = new MemStorage();
