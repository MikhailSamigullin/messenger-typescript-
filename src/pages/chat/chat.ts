import { Block } from '../../utils/Block';

interface ChatPageProps {
}

export class ChatPage extends Block {
    constructor(props: ChatPageProps) {
        super('div', props);
        this.setProps({
			onClick: () => {
                console.log('log')
				// loginPage()
			},
        })
        
    }

    render() {
        return `    
        <main class="chat__container">
        {{#BackButton href="/login"}}
        {{/BackButton}}
        <div class="chat-list">
        
            <div class="chat-list__profile">
            
                <a href="#" class="chat-list__add-button">+ Новый чат</a>
                <a href="/profile" class="">Профиль</a>
            </div>
            
            <div class="chat-list__search">
                <input type="search" 
                       name="search" 
                       id="search"
                       placeholder="Поиск">
            </div>
            <div class="list">
                <div class="list__item">
                    <a href="/message" class="list__photo"></a>
                    <div class="list__chat">
                        <a href="/message" class="list__name">Андрей</a>
                        <a href="/message" class="list__last-message">Изображение</a>
                    </div>
                    <div class="list__info">
                        <div class="list__data">10:49</div>
                        <a href="/message" class="list__unread-messages">2</a>
                    </div>
                </div>
                <div class="list__item">
                    <a  href="/message" class="list__photo"></a>
                    <div class="list__chat">
                        <a  href="/message" class="list__name">Киноклуб</a>
                        <a  href="/message" class="list__last-message">
                            <span>Вы: </span>стикер</a>
                    </div>
                    <div class="list__info">
                        <div class="list__data">12:00</div>
                        <a  href="/message" class="list__unread-messages" hidden></a>
                    </div>
                </div>
                <div class="list__item">
                    <a href="/message" class="list__photo"></a>
                    <div class="list__chat">
                        <a href="/message" class="list__name">Илья</a>
                        <a  href="/message" class="list__last-message">Друзья, у меня для вас особенный выпуск новостей!...</a>
                    </div>
                    <div class="list__info">
                        <div class="list__data">15:12</div>
                        <a  href="/message" class="list__unread-messages">4</a>
                    </div>
                </div>
                <div class="list__item">
                    <a  href="/message" class="list__photo"></a>
                    <div class="list__chat">
                        <a href="/message" class="list__name">тет-ф-теты</a>
                        <a  href="/message" class="list__last-message">
                                И Human Interface Guidelines 
                                и Material Design рекомендуют...
                            </a>
                    </div>
                    <div class="list__info">
                        <div class="list__data">Ср</div>
                        <a  href="/message" class="list__unread-messages" hidden></a>
                    </div>
                </div>
                <div class="list__item">
                    <a href="/message" class="list__photo"></a>
                    <div class="list__chat">
                        <a href="/message" class="list__name">1, 2, 3</a>
                        <a href="/message" class="list__last-message">
                            Миллионы россиян ежедневно 
                                проводят десятки часов свое...</a>
                    </div>
                    <div class="list__info">
                        <div class="list__data">Пн</div>
                        <a  href="/message" class="list__unread-messages" hidden></a>
                    </div>
                </div>
                <div class="list__item">
                    <a href="/message" class="list__photo"></a>
                    <div class="list__chat">
                        <a href="/message" class="list__name">Design Destroyer</a>
                        <a href="/message" class="list__last-message">
                            В 2008 году художник 
                                Jon Rafman начал собирать...</a>
                    </div>
                    <div class="list__info">
                        <div class="list__data">Пн</div>
                        <a  href="/message" class="list__unread-messages" hidden></a>
                    </div>
                </div>
                <div class="list__item">
                    <a href="/message" class="list__photo"></a>
                    <div class="list__chat">
                        <a href="/message" class="list__name">Day.</a>
                        <a href="/message" class="list__last-message">
                            Так увлёкся работой по курсу, 
                            что совсем забыл...</a>
                    </div>
                    <div class="list__info">
                        <div class="list__data">01.05.20</div>
                        <a  href="/message" class="list__unread-messages" hidden></a>
                    </div>
                </div>
                <div class="list__item">
                    <a href="/message" class="list__photo"></a>
                    <div class="list__chat">
                        <a href="/message" class="list__name">Стас Рогозин</a>
                        <a href="/message" class="list__last-message">
                            Можно или сегодня или завтра вечером.</a>
                    </div>
                    <div class="list__info">
                        <div class="list__data">12.04.20</div>
                        <a  href="/message" class="list__unread-messages" hidden></a>
                    </div>
                </div>
            </div>
        </div>
        </main>   
    `
    }
}