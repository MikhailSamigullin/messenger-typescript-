import { User } from '../../api/UserApi';
import { Input } from '../../components/Input/input';
import AuthController from '../../controller/AuthController';
import UserController from '../../controller/UserController';
import { Block } from '../../utils/Block';
import { withStore } from '../../utils/Store';
import { validateInput } from '../../utils/validateInput';

interface ChangeProfilePageProps {
  title: string;
}

export class ChangeProfilePageBase extends Block {
  constructor(props: ChangeProfilePageProps) {
    super('div', props);
    AuthController.fetchUser();
    this.setProps({
      ...props,
      email: this.props.email,
      login: this.props.login,
      first_name: this.props.first_name,
      nickname: this.props.display_name === null 
                ? `${this.props.first_name}_${this.props.second_name}` 
                : this.props.display_name,
      second_name: this.props.second_name,
      phone: this.props.phone,
      submit: validateInput,
      events: {
        submit: (e: SubmitEvent) => this.onSubmit(e),
      }
    })
  } 

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    const values = Object
      .values(this.children)
      .filter(child => child instanceof Input)
      .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))
    const data = Object.fromEntries(values);
    console.log(data);
    UserController.updateProfile(data as User);
  }

render() {
  return `  
    <main class="login__container">
      <div class="login-register">
        {{#BackButton href="/profile"}}
        {{/BackButton}}
        <h1 class="login-register__title">{{title}}</h1>
        <div class="login-register__block">
          <form id="login-form" action="/profile" method="post" onClick="click">
            <label class="input__label" for="email">Почта</label>
            {{#Input class="input" type="email" name="email" value="Почта" oldValue=email }}
            {{/Input}}
            <span id="email" class="input__error"> </span>
            <label class="input__label" for="login">Логин</label>
            {{#Input class="input" type="text" name="login" value="Логин" oldValue=login }}
            {{/Input}}
            <span id="login" class="input__error"> </span>
            <label class="input__label" for="first_name">Имя</label>
            {{#Input class="input" type="text" name="first_name" value="Имя" oldValue=first_name }}
            {{/Input}}
            <span id="first_name" class="input__error"> </span>
            <label class="input__label" for="second_name">Фамилия</label>
            {{#Input class="input" type="text" name="second_name" value="Фамилия" oldValue=second_name }} 
            {{/Input}}
            <span id="second_name" class="input__error"> </span>
            <label class="input__label" for="display_name">Никнейм</label>
            {{#Input class="input" type="text" name="display_name" value="Никнейм" oldValue=nickname }} 
            {{/Input}}
            <span id="display_name" class="input__error"> </span>
            <label class="input__label" for="phone">Телефон</label>
            {{#Input class="input" type="tel" name="phone" value="Телефон" oldValue=phone }} 
            {{/Input}}
            <span id="phone" class="input__error"> </span>
            {{#Button type="submit" }}
              Сохранить
            {{/Button}}
          </form>
        </div>
      </div>
  </main>`
  }
}
const withUser: any = withStore((state) => ({ ...state.user }))
export const ChangeProfilePage = withUser(ChangeProfilePageBase);
