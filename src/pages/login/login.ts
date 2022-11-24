import { Block } from '../../utils/Block';

interface LoginPageProps {
    title: string;
}

export class LoginPage extends Block {
    constructor(props: LoginPageProps) {
        super('div', props);

        
    }
    // onButtonClick = () => {
    //     console.log('click on the button');
    // }
//class="sidebar" href="/"
    render() {
        return `   
        <main class="login__container">
        <div class="login-register">
            {{#BackButton href="../"}}
            {{/BackButton}}
            <h1 class="login-register__title">{{title}}</h1>
<div class="login-register__block">
    <form id="login-form" action="./chat" method="get">
        <label class="input__label" for="login">Логин</label>
        <input class="input__text" 
                type="text" 
                name="login" 
                id="login"
                placeholder="Логин">
        <span class="input__error">Неверный логин</span>
        <label class="input__label" for="password">Пароль</label>
        <input class="input__text" 
                type="password" 
                name="password" 
                id="password"
                placeholder="Пароль"> 
        <span class="input__error">Неверный пароль</span>       
    {{#Button class="button" type="submit" }}
                Авторизоваться
            {{/Button}} 
     </form>  
</div>  
                 
<a href="./register" class="login-register__register-link">Нет аккаунта?</a>
        </div>
    </main>`
    }
}