import { service, logger, broacastEvent } from '../decorators';
import User from "../entities/user";
import * as chalk from "chalk";
import BaseService from '../base/baseService';


@service<typeof UserService>([new User("phanvudinh", 27)])
class UserService extends BaseService {
  static serviceName: string = "UserSerivce";

  private users: User[];
  constructor(users: User[]) {
    super();
    this.users = users;
  }

  @logger(chalk.blueBright('calling UserService.getAllUsers'))
  public getAllUsers(): User[] {
    return [...this.users];
  }

  // @logger("calling UserService.getName:")
  static getName(): string {
    return "User Service";
  }

  @broacastEvent({eventType: "addUser"})
  public addUsers(...users: User[]): void {
    this.users.push(...users);
  }

  public getFirstUser(): undefined | User {
    return this.users[0]
  }

  public toString(): string {
    return "UserService";
  }
}

export default UserService;

