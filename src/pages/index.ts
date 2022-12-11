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
  Profile = '/profile'
}

registerComponent('Button', Button as any);
registerComponent('BackButton', BackButton as any);
registerComponent('Input', Input as any);
registerComponent('ChatCard', ChatCard as any);
registerComponent('Message', Message as any);
registerComponent('Link', Link as any);

// window.addEventListener('DOMContentLoaded',() => {
//   const root = document.querySelector('#app') as HTMLDivElement;
//   const path: string = window.location.pathname;
//   let page: any;

// // Временный роутинг
//     const pagesList: any = {
//       '/': new HomePage({
//         title: 'Просто.',
//         titleSub: 'Чат.'}),
//       '/index': new HomePage({
//         title: 'Просто.',
//         titleSub: 'Чат.'}),
//       '': new HomePage({
//         title: 'Просто.',
//         titleSub: 'Чат.'}),
//       '/login': new LoginPage({
//         title: 'Вход'}),
//       '/register': new RegisterPage({
//         title: 'Регистрация'}),
//       '/error500': new ErrorPage({
//         error: '500',
//         title: 'ОШИБКА!',
//         description: 'Нет ответа от сервера'}),
//       '/error404': new ErrorPage({
//         error: '404',
//         title: 'ОШИБКА!',
//         description: 'Ничего не найдено'}),
//       '/chat': new ChatPage({name: '',
//         yourMessage: '',
//         chatList: '',
//         lastMessage: '',
//         data: '',
//         id: '',
//         hidden: '',
//         unreadMessages: '',}),
//       '/profile': new ProfilePage({
//         title: ''
//       }),
//       '/changeProfile': new ChangeProfilePage({
//         title: ''
//       }),
//     }

//     if (Object.keys(pagesList).includes(path)) {
//       page = pagesList[path];
//       } else {
//       const nextArr = Object.values(chatList).filter((item) => {
//         if (item.id === path.slice(1)) {
//           return item
//         }
//       }
//       )
      
//       Object.assign(pagesList, {[path]: new MessagePage({
//         name: nextArr[0].name,
//         messages: {},
//         message: '',
//         areYouOwner: '',
//         data: '',
//         id: '',
//       })});
//       page = pagesList[path];
//       }

//       root?.append(page.getContent());
// })

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, LoginPage)
    .use(Routes.Register, RegisterPage)
    .use(Routes.Profile, ProfilePage)

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
