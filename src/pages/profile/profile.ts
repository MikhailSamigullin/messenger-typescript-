import AuthController from '../../controller/AuthController';
import { Block } from '../../utils/Block';
import { withStore } from '../../utils/Store';

interface ProfilePageProps {
  title: string;
  to: string;
}

class ProfilePageBase extends Block {
  constructor(props: ProfilePageProps) {
    super('div', props);
    AuthController.fetchUser();
    this.setProps({
      name: this.props.first_name,
      event: {
        }
      })
  }

  render() {
    return `  
      <div class="login__container">
        <div class="login-register">
          {{#BackButton href="/chat"}}
          {{/BackButton}}
          <div class="header">
            {{#Link  class="header__photo" onClick="click" to="/changeAvatar"}}
              
            <img src="https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}" alt="photo" />
            {{/Link}}
            <span class="header__name">Привет, ${this.props.first_name}!</span>
          </div>
        <div class="profile-info">
          <ul>
            <li>
              <span>Почта</span>
              <span>${this.props.email}</span>
            </li>
            <li>
              <span>Логин</span>
              <span>${this.props.login}</span>
            </li>
            <li>
              <span>Имя</span>
              <span>${this.props.first_name}</span>
            </li>
            <li>
              <span>Фамилия</span>
              <span>${this.props.second_name}</span>
            </li>
            <li>
              <span>Имя в чате</span>
              <span>${this.props.display_name}</span>
            </li>
            <li>
              <span>Телефон</span>
              <span>${this.props.phone}</span>
            </li>
          </ul>
        </div>
        <nav class="footer">
          <ul>
            <li>
              {{#Link  class="footer__change-info" onClick="click" to="/changeProfile"}}
                Изменить данные
              {{/Link}}</li>
            <li>
              {{#Link  class="footer__change-info" onClick="click" to="/changePassword"}}
                Изменить пароль
              {{/Link}}</li>
            <li>
              {{#Link  class="footer__logout" onClick="click" to="/"}}
                Выйти
              {{/Link}}
            </li>
          </ul>
        </nav>
      </div>
    </div>`
  }
}

const withUser: any = withStore((state) => ({ ...state.user }))
export const ProfilePage = withUser(ProfilePageBase);
