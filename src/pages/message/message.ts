import { Block } from '../../utils/Block';
import { ChatInfo } from '../../api/ChatsApi';
import ChatController from '../../controller/ChatController';
import ChatsList from '../../components/ChatList';
import Messenger from '../../components/Messenger';
import MessagesController from '../../controller/MessagesController';
import Chat from '../../components/Chat';
import { withStore } from '../../utils/Store';
import Message from '../../components/Message';
import Handlebars from 'handlebars'

interface MessagePageProps {
  messages: any;
  userId: any;
  unread: string;
  created: string;
  avatar: any;
  title: string;
  id: string;
  chats: ChatInfo[];
  isLoaded: boolean;
  isMine: boolean;
}

export class MessageBase extends Block {
  [x: string]: any;
  constructor(props: MessagePageProps) {
    super('div', props);
    this.setProps({
      ...props,
			isLoaded: props.isLoaded,
      id: props.id,
      title: props.messages[0], 
      avatar: props.avatar, 
      created_by: props.created, 
      unread_count: props.unread,
      chats: this.props.chats,
      messages: this.props.messages,
      isMine: props.userId === props.messages.user_id,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault()
          const path = +window.location.search.slice(1);
          const input = document.querySelector('input[name="message"]') as HTMLInputElement;
          const value = input.value;

          if (value) {
            MessagesController.sendMessage(path, value);
          }

          input.value = '';

          const inputName = document.querySelector('input[name="name"]') as HTMLInputElement;       
          const valueName = inputName.value;

          if (valueName) {
            ChatController.addUserToChat(path, +valueName);
          }

          inputName.value = '';

          const inputId = document.querySelector('input[name="id_user"]') as HTMLInputElement;
          const valueId = inputId.value;
          if (valueId) {
            console.log(valueId);
            ChatController.deleteUserFromChat(path, +valueId);
          }
          inputId.value = '';
        }
      }
			},
    )
  }

  private createMessages(props: MessagePageProps) {
    return props.messages.map((data: any) => {
      return new Message({...data, isMine: props.userId === data.user_id });
    })
  }

  private createChats(props: MessagePageProps) {
    return props.chats.map(data => {
      return new Chat({
        ...data,
      id: this.props.id,
        events: {
          click: (e: MouseEvent) => {
            e.preventDefault();
            ChatController.selectChat(data.id);
          }
        }
      });
    })
  }

  init() {
    this.children.chatsList = new ChatsList({ isLoaded: false });
    this.children.messenger = new Messenger({});

    ChatController.fetchChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true
      })
      ChatController.fetchChats()
    });
  }

  render()
  { let title = '';
    const path = +window.location.search.slice(1);
    const arr = this.props.chats.filter((item: any) => {
      if (item.id === path) {
        title = item.title;
      }
    })
    return `  
      <main class="chat">
        <div class="chat__header">
          {{#BackButton href="/chat"}}
          {{/BackButton}}
          <a href="#" class="chat__photo"></a>
          <a href="#" class="chat__name">${title}</a>
          {{#each this.messages}}
            {{this.title}}
          {{/each}}

          {{#Modal}}
          {{/Modal}}

        </div>
        <div class="dialog">
        
        {{#each this.messages}}
          {{#ifCond user_id ${this.props.userId}}}
            <div class="chat__message_mine">
              {{ content }}
            </div>
          {{else}}
            <div class="chat__message-not_mine">
              {{ content }}
            </div>
          {{/ifCond}}
        {{/each}}

        </div>
          <form class="chat__footer" method="post" onClick="submit">
            <a href="#" class="chat__upload"></a>
            <input type="text" 
            class="chat__message"
            placeholder="Сообщение"
            name="message"
            required></input>
            <button type="submit" class="chat__button"></button>
          </form>
        </div>
      </main>
  `
  }
}
const path = +window.location.search.slice(1);

const withChats: any = withStore((state) => ({
  chats: [...(state.chats || [])],
  messages: (state.messages || {})[path] || [],
  userId: state.user.id
}));

Handlebars.registerHelper('ifCond', function(v1: any, v2: any, options: any) {
  if(v1 === v2) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return options.fn(this);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
  return options.inverse(this);
})

export const MessagePage = withChats(MessageBase);
