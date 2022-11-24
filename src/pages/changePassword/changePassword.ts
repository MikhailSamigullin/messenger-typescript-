import { Block } from '../../utils/Block';

interface ChangePasswordPageProps {
}

export class ChangePasswordPage extends Block {
    constructor(props: ChangePasswordPageProps) {
        super('div', props);

        
    }
    // onButtonClick = () => {
    //     console.log('click on the button');
    // }
//class="sidebar" href="/"
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
                    <ul>
                        <li>
                            <span>Старый пароль</span>
                            <input type="password" 
                                   name="oldPassword" 
                                   id="oldPassword"
                                   placeholder="Пароль">
                        </li>
                        <li>
                            <span>Новый пароль</span>
                            <input type="password" 
                                   name="newPassword"
                                   id="newPassword"
                                   placeholder="Пароль">
                        </li>
                        <li>
                            <span>Повторите новый пароль </span>
                            <input type="password" 
                                   name="newPassword"
                                   id="newPassword"
                                   placeholder="Пароль">
                        </li>
                    </ul>
                    <div class="footer">
                    {{#Button class="button" type="submit" }}
                    Сохранить
                    {{/Button}} 

                </div>
                </form>
                
            </div>
    </div>
    `
    }
}