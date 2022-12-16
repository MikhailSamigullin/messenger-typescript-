import AuthController from '../../controller/AuthController';
import { Block } from '../../utils/Block';
import { withStore } from '../../utils/Store';
import { Link } from '../../components/Link/link'

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
    console.log(this.props.avatar);
    return `  
      <div class="profile__container">
        {{#BackButton href="/chat"}}
        {{/BackButton}}
        <div class="profile">
          <div class="header">
            <a href="/changeAvatar" class="header__photo"></a>
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
            <li><a href="/changeProfile" class="footer__change-info">Изменить данные</a></li>
            <li><a href="/changePassword" class="footer__change-info">Изменить пароль</a></li>
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

