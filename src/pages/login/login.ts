import { Block } from '../../utils/Block';
import { validateInput } from '../../utils/validateInput';
import Link from '../../components/Link/';
import AuthController from '../../controller/AuthController';
import { Input } from '../../components/Input/input';
import { SigninData, SignupData } from '../../api/AuthApi';

interface LoginPageProps {
  title: string;
  label: string;
}

export class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super('div', props);
    this.setProps({
      // click: validateInput,
      events: {
        click: () => this.onSubmit()
      }
    })

  }

  onSubmit() {
    const values = Object
      .values(this.children)
      .filter(child => child instanceof Input)
      .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))

    const data = Object.fromEntries(values);
console.log(data);
    AuthController.signin(data as SigninData);
  }

  render() {
    return `   
      <main class="login__container">
        <div class="login-register">
          {{#BackButton href="../"}}
          {{/BackButton}}
          <h1 class="login-register__title">{{title}}</h1>
          <div class="login-register__block">
            <form id="login-form" action="/chat" method="post" onClick="click">
              <label class="input__label" for="login">Логин</label>
              {{#Input class="input" type="text" name="login" value="Логин" required=required}} 
              {{/Input}}
              <span id="login" class="input__error"> </span>
              <label class="input__label" for="password">Пароль</label>
              {{#Input class="input" type="password" name="password" value="Пароль" onsubmit="onSubmit" required=required}} 
              {{/Input}}
              <span id="password" class="input__error"> </span> 
              {{#Button class="button" type="button" }}
                Авторизоваться
              {{/Button}} 
            </form>  
          </div>
          {{#Link to="/register" class="login-register__register-link"}}
          Нет аккаунта?</a>
          {{/Link}}
        </div>
    </main>`
  }
}
