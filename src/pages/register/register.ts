import { Block } from '../../utils/Block';

interface RegisterPageProps {
    title: string;
}

export class RegisterPage extends Block {
    constructor(props: RegisterPageProps) {
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
            {{#BackButton href="/login"}}
            {{/BackButton}}
            <h1 class="login-register__title">{{title}}</h1>
            <div class="login-register__block">
                <form id="login-form" action="../">
                    <label class="input__label" for="email">Почта</label>
                    <input class="input__text" 
                           type="email" 
                           name="email" 
                           id="email"
                           placeholder="Почта">
                    <span class="input__error">Неподходящий формат почты</span>
                    <label class="input__label" for="login">Логин</label>
                    <input class="input__text" 
                           type="text" 
                           name="login" 
                           id="login"
                           placeholder="Логин">
                    <span class="input__error">Неверный логин</span>
                    <label class="input__label" for="login">Имя</label>
                    <input class="input__text" 
                           type="text" 
                           name="first_name" 
                           id="first_name"
                           placeholder="Имя">
                    <span class="input__error">Неверный формат</span>
                    <label class="input__label" for="login">Фамилия</label>
                    <input class="input__text" 
                           type="text" 
                           name="second_name" 
                           id="second_name"
                           placeholder="Фамилия">
                    <span class="input__error">Неверный формат</span>       
                    <label class="input__label" for="login">Телефон</label>
                    <input class="input__text" 
                           type="tel" 
                           name="phone" 
                           id="phone"
                           placeholder="Телефон">
                    <span class="input__error">Неверный формат</span>  
                    <label class="input__label" for="password">Пароль</label>
                    <input class="input__text" 
                           type="password" 
                           name="password" 
                           id="password"
                           placeholder="Пароль"> 
                    <span class="input__error">Неверный пароль</span>  
                    <label class="input__label" for="password">Пароль (еще раз)</label>
                    <input class="input__text" 
                           type="password" 
                           name="password" 
                           id="password"
                           placeholder="Пароль (еще раз)"> 
                    <span class="input__error">Пароли не совпадают</span>  
                    {{#Button type="submit" }}
                Зарегистрироваться
            {{/Button}} 
                </form>
            </div>
        </div>
    </main>
    `
    }
}