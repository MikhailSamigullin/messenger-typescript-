import { Block } from '../../utils/Block';

interface ChangeProfilePageProps {
  title: string;
}

export class ChangeProfilePage extends Block {
  constructor(props: ChangeProfilePageProps) {
    super('div', props);
  }

  render() {
    return `  
            <div class="profile__container">
            {{#BackButton href="/profile"}}
            {{/BackButton}}
            <div class="profile">
                <div class="header">
                <a href="#" class="header__photo"></a>
                <span class="header__name">Иван</span>
                </div>
                <form id="profile-info" class="profile-info" action="/profile">
                <label class="input__label" for="email">Почта</label>
                {{#Input class="input" type="email" name="email" value="dqwdtuqfd@mail.ru" }} 
                {{/Input}}
                <span id="email" class="input__error"> </span>
        
                <label class="input__label" for="login">Логин</label>
                {{#Input class="input" type="text" name="login" value="Ivann" }} 
                {{/Input}}
                <span id="login" class="input__error"> </span>
                
                <label class="input__label" for="first_name">Имя</label>
                {{#Input class="input" type="text" name="first_name" value="Иван" }} 
                {{/Input}}
                <span id="first_name" class="input__error"> </span>
        
                <label class="input__label" for="second_name">Фамилия</label>
                {{#Input class="input" type="text" name="second_name" value="Иванович" }} 
                {{/Input}}
                <span id="second_name" class="input__error"> </span>
        
                <label class="input__label" for="phone">Телефон</label>
                {{#Input class="input" type="tel" name="phone" value="89090000000" }} 
                {{/Input}}
                <span id="phone" class="input__error"> </span>
        
                <label class="input__label" for="password">Пароль</label>
                {{#Input class="input" type="password" name="password" value="Пароль" }} 
                {{/Input}}
                <span id="password" class="input__error"> </span>
        
                
                <div class="footer">
                {{#Button type="submit" }}
                Сохранить
                {{/Button}} 
                </div>
                </form>
                
            </div>
        </div>
  `
  }
}
