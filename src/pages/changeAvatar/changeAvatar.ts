import { User } from '../../api/UserApi';
import { Input } from '../../components/Input/input';
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


    

  onSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    const myUserForm: any = document.getElementById('avatar-form');
    // const avatar1 = document.getElementById('avatar');
    
    const form: any = new FormData(myUserForm);
    form.append('avatar', 1);


    console.log(form);



    // UserController.updateAvatar({ data: formData });



// console.log(formData);
// console.log(avatar1);
// console.log(form);
// console.log(this.props);
    // const values = Object
    //   .values(this.children)
    //   .filter(child => child instanceof Input)
    //   .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))

    // const data = Object.fromEntries(values);
    // console.log(data);
    // console.log(this.props);
    // UserController.updateAvatar(form);
  }
  // class="header__photo"
render() {
  return `  
    <main class="login__container">
      <div class="login-register">
        {{#BackButton href="/profile"}}
        {{/BackButton}}
        <div class="header">
        <img src="{{avatar}}" alt="photo" />
        <span class="header__name">Привет, ${this.props.first_name}!</span>
      </div>
        <h1 class="login-register__title">{{title}}</h1>
        <div class="login-register__block">
          <form id="avatar-form" action="/profile" method="put" onClick="submit">

            <label class="input__label" for="avatar">Выберите новый аватар</label>
            <input class="input" type="file" name="avatar" accept="image/*"/>
            <span id="oldPassword" class="input__error"> </span>

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
