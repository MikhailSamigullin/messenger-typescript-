import { Block } from '../../utils/Block';

interface ChangeProfilePageProps {
}

export class ChangeProfilePage extends Block {
    constructor(props: ChangeProfilePageProps) {
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
                            <span>Почта</span>
                            <input type="email" 
                                   name="email" 
                                   id="email"
                                   placeholder="pochta@yandex.ru">

                        </li>
                        <li>
                            <span>Логин</span>
                            <input type="text" 
                                   name="login" 
                                   id="login"
                                   placeholder="ivanivanov">
                        </li>
                        <li>
                            <span>Имя</span>
                            <input type="text" 
                                   name="first_name" 
                                   id="first_name"
                                   placeholder="Иван">
                        </li>
                        <li>
                            <span>Фамилия</span>
                            <input type="text" 
                                   name="second_name" 
                                   id="second_name"
                                   placeholder="Иванов">
                        </li>
                        <li>
                            <span>Имя в чате</span>
                            <input type="text" 
                                   name="display_name" 
                                   id="display_name"
                                   placeholder="Иван">
                        </li>
                        <li>
                            <span>Телефон</span>
                            <input type="tel" 
                                   name="phone"
                                   id="phone"
                                   placeholder="+7 (909) 967 30 30">
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