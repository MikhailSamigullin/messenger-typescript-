import HomePage from "../pages/home";

import { LoginPage } from "./login/login";
import { RegisterPage } from "./register/register";
import { ErrorPage } from "./error/error";
import { ChatPage } from "./chat/chat";
import { MessagePage } from "./message/message";
import { ProfilePage } from "./profile/profile";
import { ChangeProfilePage } from "./changeProfile/changeProfile";

import { Button } from "../components/Button/button";
import { BackButton } from "../components/BackButton/backButton";
import { Input } from "../components/Input/input";
import { ChatCard } from "../components/ChatCard/chatCard";
import { Message }  from "../components/Message/message";
import { Link }  from "../components/Link/link";

import { registerComponent} from "../utils/registerComponent";
import { chatList } from '../data/chatList';

import Router from '../utils/Router';
import store from '../utils/Store';
import AuthController from '../controller/AuthController';

enum Routes {
  Index = '/',
  Register = '/register',
  Chat = '/chat',
  Profile = '/profile'
}

registerComponent('Button', Button as any);
registerComponent('BackButton', BackButton as any);
registerComponent('Input', Input as any);
registerComponent('ChatCard', ChatCard as any);
registerComponent('Message', Message as any);
registerComponent('Link', Link as any);

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, LoginPage)
    .use(Routes.Register, RegisterPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Chat, ChatPage)

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
      Router.go(Routes.Profile)
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }

});
