import { service, injectService } from '../decorators'
import UserService from './userService';
import BaseService from '../base/baseService';

@service<typeof ChatService>("good")
class ChatService extends BaseService {
  static serviceName: string = "ChatService";

  @injectService(UserService)
  private userService: UserService;

  public status: string;

  constructor(status: string) {
    super();
    this.status = status;
    this.subscribe(this.userService, this.onUserChange.bind(this));
  }

  public getStatus(): string {
    return this.status;
  }

  public toString(): string {
    return "ChatSerivce";
  }

  public getUserService(): UserService {
    return this.userService;
  }

  private onUserChange(eventData: any){
    console.log("change", eventData, this.userService.getAllUsers());
  }
}

export default ChatService;

