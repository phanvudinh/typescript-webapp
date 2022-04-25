import { service } from '../decorators'
import User from "../entities/user"

@service<typeof UserService>([new User("messi", 32)])
class UserService {
  private users: User[];
  constructor(users: User[]) {
    this.users = users
  }

  public getAllUsers(): User[] {
    return [...this.users];
  }
}

export default UserService;