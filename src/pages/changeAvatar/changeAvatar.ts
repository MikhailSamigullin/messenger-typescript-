import AuthController from '../../controller/AuthController';
import UserController from '../../controller/UserController';
import { Block } from '../../utils/Block';
import { withStore } from '../../utils/Store';
import { validateInput } from '../../utils/validateInput';

interface ChangeAvatarPageProps {
  title: string;
  avatar: any;
}

export class ChangeAvatarPageBase extends Block {
  constructor(props: ChangeAvatarPageProps) {
    super('div', props);
    AuthController.fetchUser();
    this.setProps({
      avatar: this.props.avatar,
      submit: validateInput,
      events: {
        submit: (e: any) => this.onSubmit(e)
      }
    })
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();

      const fileInput: any = document.getElementById('avatar') as HTMLInputElement;
      const data: any = new FormData();
      data.append("avatar", fileInput.files[0]);
      UserController.updateAvatar(data);
  }
render() {
  return `  
    <main class="login__container">
      <div class="login-register">
        {{#BackButton href="/profile"}}
        {{/BackButton}}
        <div class="header">
        <img src="https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}" alt="photo" />
        <span class="header__name">Привет, ${this.props.first_name}!</span>
      </div>
        <h1 class="login-register__title">{{title}}</h1>
        <div class="login-register__block">
          <form id="myUserForm" action="/profile" method="put" onClick="submit">

            <label class="input__label" for="avatar">Выберите новый аватар</label>
            <input class="input" id="avatar" type="file" name="avatar" accept="image/*" required/>
            <span id="send" class="input__error"> </span>

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
export const ChangeAvatarPage = withUser(ChangeAvatarPageBase);
