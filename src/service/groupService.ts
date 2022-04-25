import { service, injectService } from '../decorators'
import UserService from './userService';
import BaseService from '../base/baseService';

@service<typeof GroupService>(true)
class GroupService extends BaseService {
    static serviceName: string = "ChatService";

    @injectService(UserService)
    private userService: UserService;

    public private: boolean;

    constructor(status: boolean) {
        super();
        this.private = status;
    }

    public getStatus(): boolean {
        return this.private;
    }

    public toString(): string {
        return "GroupService";
    }

    public getUserService(): UserService {
        return this.userService;
    }
}

export default GroupService;

