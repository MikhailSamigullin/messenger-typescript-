import { User } from '../../api/UserApi';
import { Input } from '../../components/Input/input';
import AuthController from '../../controller/AuthController';
import UserController from '../../controller/UserController';
import { Block } from '../../utils/Block';
import { withStore } from '../../utils/Store';
import { validateInput } from '../../utils/validateInput';

// interface ChangeProfilePageProps {
//   title: string;
//   to: string;
// }

// export class ChangeProfilePageBase extends Block {
//   constructor(props: ChangeProfilePageProps) {
//     super('div', props);
//     // AuthController.fetchUser();
//     // console.log(this.props);
//     this.setProps({
//       click: validateInput,
//       name: this.props.first_name,
//       events: {
//         click: () => this.onSubmit()
//       }
//     })
    
//   }
  
//     onSubmit() {
//       const values = Object
//         .values(this.children)
//         .filter(child => child instanceof Input)
//         .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))
  
//       const data = Object.fromEntries(values);
//       console.log(data);
//       UserController.updateProfile(data as User);
//     }

  

//   render() {
    
//     return `  
//             <div class="profile__container">
//             {{#BackButton href="/profile"}}
//             {{/BackButton}}
//             <div class="profile">
//                 <div class="header">
//                 <a href="${this.props.avatar}" class="header__photo"></a>
//                 <span class="header__name">{{name}}</span>
//                 </div>
//                 <form id="profile-info" class="profile-info"  method="post" onClick="click">
//                 <label class="input__label" for="email">Почта</label>
//                 {{#Input class="input" type="email" name="email" value="${this.props.email}" }} 
//                 {{/Input}}
//                 <span id="email" class="input__error"> </span>
        
//                 <label class="input__label" for="login">Логин</label>
//                 {{#Input class="input" type="text" name="login" value="${this.props.login}" }} 
//                 {{/Input}}
//                 <span id="login" class="input__error"> </span>
                
//                 <label class="input__label" for="first_name">Имя</label>
//                 {{#Input class="input" type="text" name="first_name" value="${this.props.first_name}" }} 
//                 {{/Input}}
//                 <span id="first_name" class="input__error"> </span>
        
//                 <label class="input__label" for="second_name">Фамилия</label>
//                 {{#Input class="input" type="text" name="second_name" value="${this.props.second_name}" }} 
//                 {{/Input}}
//                 <span id="second_name" class="input__error"> </span>

//                 <label class="input__label" for="second_name">Имя в чате</label>
//                 {{#Input class="input" type="text" name="display_name" value="${this.props.display_name}" }} 
//                 {{/Input}}
//                 <span id="second_name" class="input__error"> </span>
        
//                 <label class="input__label" for="phone">Телефон</label>
//                 {{#Input class="input" type="tel" name="phone" value="${this.props.phone}" }} 
//                 {{/Input}}
//                 <span id="phone" class="input__error"> </span>
        
                
        
      
//                 <div class="footer">
//                 {{#Button type="submit" }}
//                 Сохранить
//                 {{/Button}} 
//                 </div>
//                 </form>
                
//             </div>
//         </div>
//   `
//   }
// }
// const withUser: any = withStore((state) => ({ ...state.user }))

// export const ChangeProfilePage = withUser(ChangeProfilePageBase);
// <label class="input__label" for="password">Пароль</label>
//                 {{#Input class="input" type="password" name="password" value="Новый_пароль" }} 
//                 {{/Input}}
//                 <span id="password" class="input__error"> </span>


interface ChangeProfilePageProps {
  title: string;
}

export class ChangeProfilePageBase extends Block {
  constructor(props: ChangeProfilePageProps) {
    super('div', props);
    AuthController.fetchUser();
    this.setProps({
      submit: validateInput,
      events: {
        submit: (e) => this.onSubmit(e)
      }
    })
  }

  onSubmit(e) {
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
  console.log(this.props);
  return `  
    <main class="login__container">
      <div class="login-register">
        {{#BackButton href="/profile"}}
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
            <label class="input__label" for="display_name">Фамилия</label>
            {{#Input class="input" type="text" name="display_name" value="Никнейм" }} 
            {{/Input}}
            <span id="display_name" class="input__error"> </span>
            <label class="input__label" for="phone">Телефон</label>
            {{#Input class="input" type="tel" name="phone" value="Телефон" }} 
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
