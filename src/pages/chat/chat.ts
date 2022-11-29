import { Block } from '../../utils/Block';
import { chatList } from '../../data/chatList';

interface ChatPageProps {
  name: string;
  yourMessage: string;
  chatList: any;
  lastMessage: string;
  data: string;
  id: string;
  hidden: string;
  unreadMessages: string;
}

export class ChatPage extends Block {
  constructor(props: ChatPageProps) {
    super('', props);   
    this.setProps({
      chatList: chatList,
      name: props.chatList,
      yourMessage: props.yourMessage,
      lastMessage: props.lastMessage,
      data: props.data,
      id: props.id,
      hidden: props.hidden,
      unreadMessages: props.unreadMessages,
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
                  {{#each chatList}}
                    {{#ChatCard name=this.name
                      id=this.id
                      yourMessage=this.yourMessage
                      lastMessage=this.lastMessage
                      data=this.data
                      hidden=this.hidden
                      unreadMessages=this.unreadMessages
                    }}
                    {{/ChatCard}}
                  {{/each}}
                </div>
              </div>
            </main>   
  `
  }
}
