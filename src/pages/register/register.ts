import { SignupData } from '../../api/AuthApi';
import { Input } from '../../components/Input/input';
import AuthController from '../../controller/AuthController';
import { Block } from '../../utils/Block';
import { validateInput } from '../../utils/validateInput';

interface RegisterPageProps {
  title: string;
}

export class RegisterPage extends Block {
  constructor(props: RegisterPageProps) {
    super('div', props);
    this.setProps({
      submit: validateInput,
      events: {
        submit: (e) => this.onSubmit(e)
      }
    })
  }

  onSubmit(e) {
    e.preventDefault()
    const values = Object
      .values(this.children)
      .filter(child => child instanceof Input)
      .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))

    const data = Object.fromEntries(values);
    console.log(data);
    AuthController.signup(data as SignupData);
    // Router.go('/profile');
  }

render() {
  return `  
    <main class="login__container">
      <div class="login-register">
        {{#BackButton href="/login"}}
        {{/BackButton}}
        <h1 class="login-register__title">{{title}}</h1>
        <div class="login-register__block">
          <form id="login-form" action="/profile" method="post" onClick="click">
            <label class="input__label" for="email">Почта</label>
            {{#Input class="input" type="email" name="email" value="Почта" }}
            {{/Input}}
            <span id="email" class="input__error"> </span>
            <label class="input__label" for="login">Логин</label>
            {{#Input class="input" type="text" name="login" value="Логин" }}
            {{/Input}}
            <span id="login" class="input__error"> </span>
            <label class="input__label" for="first_name">Имя</label>
            {{#Input class="input" type="text" name="first_name" value="Имя" }}
            {{/Input}}
            <span id="first_name" class="input__error"> </span>
            <label class="input__label" for="second_name">Фамилия</label>
            {{#Input class="input" type="text" name="second_name" value="Фамилия" }} 
            {{/Input}}
            <span id="second_name" class="input__error"> </span>
            <label class="input__label" for="phone">Телефон</label>
            {{#Input class="input" type="tel" name="phone" value="Телефон" }} 
            {{/Input}}
            <span id="phone" class="input__error"> </span>
            <label class="input__label" for="password">Пароль</label>
            {{#Input class="input" type="password" name="password" value="Пароль" }} 
            {{/Input}}
            <span id="password" class="input__error"> </span>
            {{#Button type="submit" }}
            Зарегистрироваться
            {{/Button}}
          </form>
        </div>
      </div>
  </main>`
  }
}
