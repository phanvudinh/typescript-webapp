import './initializeServies'
import UserService from './service/userService';
import DContainer from './dContainer'
import ChatService from './service/chatService';
import GroupService from './service/groupService';
import User from './entities/user';

DContainer.getService(ChatService).getUserService().addUsers(new User("Le van A", 12));

DContainer.getService(ChatService).getUserService().addUsers(new User("Le van B", 12), new User("Le sdfsdfsd", 13), new User("Le 4545", 30));

