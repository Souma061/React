import { Account, Client, ID } from 'appwrite';
import conf from '../config/config.js';

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        // another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // Handle 401 Unauthorized gracefully for guest users
      if (error.code === 401 || error.type === 'general_unauthorized_scope') {
        console.log('User not authenticated - guest access');
        return null;
      }
      // Log other errors but don't throw to prevent app crashes
      console.log('Appwrite service :: getCurrentUser :: error', error);
      return null;
    }
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log('Appwrite service :: logOut :: error', error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
