import { User } from '../../api/UserApi';
import { Input } from '../../components/Input/input';
import AuthController from '../../controller/AuthController';
import UserController from '../../controller/UserController';
import { Block } from '../../utils/Block';
import { withStore } from '../../utils/Store';
import { validateInput } from '../../utils/validateInput';

interface ChangePasswordPageProps {
  title: string;
}

export class ChangePasswordPageBase extends Block {
  constructor(props: ChangePasswordPageProps) {
    super('div', props);
    AuthController.fetchUser();
    this.setProps({
      submit: validateInput,
      events: {
        submit: (e: any) => this.onSubmit(e)
      }
    })
  }

  onSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    const values = Object
      .values(this.children)
      .filter(child => child instanceof Input)
      .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))

    const data = Object.fromEntries(values);
    UserController.updatePassword(data as User);
  }

render() {
  return `  
    <main class="login__container">
      <div class="login-register">
        {{#BackButton href="/profile"}}
        {{/BackButton}}
        <h1 class="login-register__title">{{title}}</h1>
        <div class="login-register__block">
          <form id="login-form" action="/profile" method="put" onClick="click">

            <label class="input__label" for="oldPassword">Старый пароль</label>
            {{#Input class="input" type="password" name="oldPassword" value="Пароль" oldValue=""}} 
            {{/Input}}
            <span id="oldPassword" class="input__error"> </span>

            <label class="input__label" for="newPassword">Новый пароль</label>
            {{#Input class="input" type="password" name="newPassword" value="Пароль" oldValue="" }} 
            {{/Input}}
            <span id="newPassword" class="input__error"> </span>

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
export const ChangePasswordPage = withUser(ChangePasswordPageBase);
