import { Block } from '../../utils/Block';
import { validateInput } from '../../utils/validateInput';

const data: {
  login: string, 
  password: string, 
  email: string, 
  firstName: string, 
  secondName: string, 
  phone: string
} = {
  login: '',
  password: '',
  email: '',
  firstName: '',
  secondName: '',
  phone: '',
}

interface RegisterPageProps {
  title: string;
}

export class RegisterPage extends Block {
  constructor(props: RegisterPageProps) {
    super('div', props);
    this.setProps({
      submit: validateInput,
    })
    const loginInput = document.querySelector("input[name='login']") as HTMLInputElement;
    const passwordInput = document.querySelector("input[name='password']") as HTMLInputElement;
    const emailInput = document.querySelector("input[name='email']") as HTMLInputElement;
    const secondNameInput = document.querySelector("input[name='second_name']") as HTMLInputElement;
    const firstNameInput = document.querySelector("input[name='first_name']") as HTMLInputElement;
    const phoneInput = document.querySelector("input[name='phone']") as HTMLInputElement;

    if (loginInput) {
      data.login = loginInput.value;
    }
    if (passwordInput) {
      data.password = passwordInput.value;
    }
    if (emailInput) {
      data.email = emailInput.value;
    }
    if (secondNameInput) {
      data.secondName = secondNameInput.value;
    }
    if (firstNameInput) {
      data.firstName = firstNameInput.value;
    }
    if (phoneInput) {
      data.phone = phoneInput.value;
    }
    console.log(data);
  }

render() {
  return `  
    <main class="login__container">
      <div class="login-register">
        {{#BackButton href="/login"}}
        {{/BackButton}}
        <h1 class="login-register__title">{{title}}</h1>
        <div class="login-register__block">
          <form id="login-form" action="../chat" method="get" onClick="submit">
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
