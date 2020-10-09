import {RedmineUser} from "../models/redmine-user";
import axios from "axios";
import {Config} from "../config";

export class UsersLoaderService {

  private users: {[userId: number]: RedmineUser|null} = {}

  async getUserInfo(userId: number): Promise<RedmineUser|null> {
    if (this.users.hasOwnProperty(userId)) {
      return this.users[userId]
    }
    const url = `${Config.backendUrl}/user/${userId}`
    const data = await axios.get<RedmineUser>(url)
    const userData = data.data
    this.users[userId] = userData
    return userData
  }

  clear(): void {
    this.users = {}
  }

}

export const usersLoader = new UsersLoaderService()