import { LoginPage } from "./login/login";
import { RegisterPage } from "./register/register";
import { ChatPage } from "./chat/chat";
import { MessagePage } from "./message/message";
import { ProfilePage } from "./profile/profile";
import { ChangeProfilePage } from "./changeProfile/changeProfile";
import { ChangePasswordPage } from "./changePassword/changePassword";
import { ChangeAvatarPage } from "./changeAvatar/changeAvatar";

import { Button } from "../components/Button/button";
import { BackButton } from "../components/BackButton/backButton";
import { Input } from "../components/Input/input";
import Message  from "../components/Message";
import { Link }  from "../components/Link/link";
import DeleteLink  from "../components/DeleteLink";
import AddChat  from "../components/AddChat";
import Chat from "../components/Chat";
import ChatList from "../components/ChatList";
import Messenger from "../components/Messenger";
import Modal from "../components/Modal";

import { registerComponent} from "../utils/registerComponent";

import Router from '../utils/Router';
import AuthController from '../controller/AuthController';

import "./index.scss";

enum Routes {
  Index = '/',
  Register = '/register',
  Profile = '/profile',
  Chat = '/chat',
  ChatList = '/chatList',
  ChangeProfile = '/changeProfile',
  ChangePassword = '/changePassword',
  ChangeAvatar = '/changeAvatar',
  Message = '/message'
}

registerComponent('Button', Button as any);
registerComponent('BackButton', BackButton as any);
registerComponent('Input', Input as any);
registerComponent('Message', Message as any);
registerComponent('Link', Link as any);
registerComponent('DeleteLink', DeleteLink as any);
registerComponent('Chat', Chat as any);
registerComponent('ChatList', ChatList as any);
registerComponent('Messenger', Messenger as any);
registerComponent('Message', Message as any);
registerComponent('AddChat', AddChat as any);
registerComponent('Modal', Modal as any);

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, LoginPage)
    .use(Routes.Register, RegisterPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Chat, ChatPage)
    .use(Routes.ChatList, MessagePage)
    .use(Routes.ChangeProfile, ChangeProfilePage)
    .use(Routes.ChangePassword, ChangePasswordPage)
    .use(Routes.ChangeAvatar, ChangeAvatarPage)
    .use(Routes.Message, MessagePage)

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Chat)
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }

});
