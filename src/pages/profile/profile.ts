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
      to: '/',
      event: {
        click: () => {
          AuthController.logout();
        }
      }
    })
  }

  render() {
    return `  
      <div class="profile__container">
        {{#BackButton href="/chat"}}
        {{/BackButton}}
        <div class="profile">
          <div class="header">
            <a href="#" class="header__photo"></a>
            <span class="header__name">Иван</span>
          </div>
        <div class="profile-info">
          <ul>
            <li>
              <span>Почта</span>
              <span>pochta@yandex.ru</span>
            </li>
            <li>
              <span>Логин</span>
              <span>ivanivanov</span>
            </li>
            <li>
              <span>Имя</span>
              <span>Иван</span>
            </li>
            <li>
              <span>Фамилия</span>
              <span>Иванов</span>
            </li>
            <li>
              <span>Имя в чате</span>
              <span>Иван</span>
            </li>
            <li>
              <span>Телефон</span>
              <span>+7 (909) 967 30 30</span>
            </li>
          </ul>
        </div>
        <nav class="footer">
          <ul>
            <li><a href="/changeProfile" class="footer__change-info">Изменить данные</a></li>
            <li>
            
            {{#Link to="${this.props.to}" class="footer__logout" onClick="click"}}
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
