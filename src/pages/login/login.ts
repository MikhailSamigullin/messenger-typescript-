import { Block } from '../../utils/Block';

interface LoginPageProps {
  title: string;
}

export class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super('div', props);
    this.setProps({
    })
  }

  render() {
    return `   
      <main class="login__container">
        <div class="login-register">
          {{#BackButton href="../"}}
          {{/BackButton}}
          <h1 class="login-register__title">{{title}}</h1>
          <div class="login-register__block">
            <form id="login-form" action="/chat" method="get">
              <label class="input__label" for="login">Логин</label>
              {{#Input class="input" type="text" name="login" value="Логин" required=required}} 
              {{/Input}}
              <span id="login" class="input__error"> </span>
              <label class="input__label" for="password">Пароль</label>
              {{#Input class="input" type="password" name="password" value="Пароль" required=required}} 
              {{/Input}}
              <span id="password" class="input__error"> </span> 
              {{#Button class="button" type="submit" onClick="click"}}
                Авторизоваться
              {{/Button}} 
            </form>  
          </div>
          <a href="./register" class="login-register__register-link">Нет аккаунта?</a>
        </div>
    </main>`
  }
}
