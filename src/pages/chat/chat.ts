import { Block } from '../../utils/Block';
import ChatsList from '../../components/ChatList';
import Messenger from '../../components/Messenger';
import ChatsController from '../../controller/ChatController';

interface ChatPageProps {
  name: string;
  yourMessage: string;
  chatList: any;
  lastMessage: string;
  data: string;
  id: string;
  hidden: string;
  unreadMessages: string;
  value: string;
  chats: any;
}

export class ChatPage extends Block {
  constructor(props: ChatPageProps) {
    super('', props);   
    this.setProps({
      chats: props.chats,
      events: {
    }
    })
  }

  init() {
    this.children.chatsList = new ChatsList({ isLoaded: false });
    this.children.messenger = new Messenger({});
    ChatsController.fetchChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true
      })
    });
  }

  render() {
    return `  
    <main class="chat__container">
      <div class="chat-list">
        <div class="chat-list__profile">
          {{#AddChat class="chat-list__add-button"}}
            + Новый чат
          {{/AddChat}}
          
          <a href="/profile" class="">Профиль</a>
        </div>
        <div class="chat-list__search">
          <input type="search" 
            name="search" 
            id="search"
            placeholder="Поиск">
        </div>
        <div class="list">

        {{#ChatList isLoaded="true"}}
        {{/ChatList}}

        </div>
      </div>
    </main>   
  `
  }
}
