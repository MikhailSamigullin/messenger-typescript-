import HomePage from "../pages/home";
import { LoginPage } from "./login/login";
import { RegisterPage } from "./register/register";
import { ErrorPage } from "./error/error";
import { ChatPage } from "./chat/chat";
import { MessagePage } from "./message/message";
import { ProfilePage } from "./profile/profile";
import { ChangeProfilePage } from "./changeProfile/changeProfile";
import { ChangePasswordPage } from "./changePassword/changePassword";

import { Button } from "../components/Button/button";
import { BackButton } from "../components/BackButton/backButton";

import { registerComponent} from "../utils/registerComponent";




registerComponent('Button', Button as any);
registerComponent('BackButton', BackButton as any);



window.addEventListener('DOMContentLoaded',() => {
    const root = document.querySelector('#app') as HTMLDivElement;
    const path = window.location.pathname;
    let page: any;
    console.log(path)


        const pagesList: any = {
            '/': new HomePage({
                title: 'Просто.',
                titleSub: 'Чат.'}),
            '/index': new HomePage({
                title: 'Просто.',
                titleSub: 'Чат.'}),
            '': new HomePage({
                title: 'Просто.',
                titleSub: 'Чат.'}),
            '/login': new LoginPage({
                title: 'Вход'}),
            '/register': new RegisterPage({
                title: 'Регистрация'}),
            '/error500': new ErrorPage({
                error: '500',
                title: 'ОШИБКА!',
                description: 'Нет ответа от сервера'}),
            '/error404': new ErrorPage({
                error: '404',
                title: 'ОШИБКА!',
                description: 'Ничего не найдено'}),
            '/chat': new ChatPage({}),
            '/message': new MessagePage({}),
            '/profile': new ProfilePage({}),
            '/changeProfile': new ChangeProfilePage({}),
            '/changePassword': new ChangePasswordPage({}),
        }
        
        if (Object.keys(pagesList).includes(path)) {
            page = pagesList[path];
          }
        

          root?.append(page.getContent());
})
