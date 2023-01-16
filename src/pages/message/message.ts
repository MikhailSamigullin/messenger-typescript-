import { Block } from '../../utils/Block';
import { ChatInfo } from '../../api/ChatsApi';
import ChatController from '../../controller/ChatController';
import MessagesController from '../../controller/MessagesController';
import { withStore } from '../../utils/Store';
import Handlebars from 'handlebars';

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
  chatId: any;
}

export class MessageBase extends Block {
  [x: string]: any;
  constructor(props: MessagePageProps) {
    super('div', props);
    this.setProps({
      ...props,
			isLoaded: props.isLoaded,
      id: props.id,
      title: props.title, 
      avatar: props.avatar, 
      created_by: props.created, 
      unread_count: props.unread,
      chats: this.props.chats,
      messages: this.props.messages,
      isMine: props.userId === props.messages.user_id,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault()
          const path = +this.props.selectedChat;
          const input = document.querySelector('input[name="message"]') as HTMLInputElement;
          const value = input.value;

          if (value) {
            MessagesController.sendMessage(path, value);
          }

          input.value = '';

          const inputName = document.querySelector('input[name="name"]') as HTMLInputElement;       
          const valueName = inputName.value;

          if (valueName) {
            console.log(`В чат ${path} добавляем пользователя ${valueName}` );
            ChatController.addUserToChat(path, +valueName);
          }

          inputName.value = '';

          const inputId = document.querySelector('input[name="id_user"]') as HTMLInputElement;
          const valueId = inputId.value;
          if (valueId) {
            ChatController.deleteUserFromChat(path, +valueId);
          }
          inputId.value = '';
        }
      }
			},
    )
  }

  render()
  { 
    return `  
      <main class="chat">
        <div class="chat__header">
          {{#BackButton href="/chat"}}
          {{/BackButton}}
          {{#if this.avatar}}
            <img name="{{this.id}}" src="https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}" class="chat__photo"></img>
            {{else}}
            <img name="{{this.id}}" src="https://ya-praktikum.tech/api/v2/resources/235bb159-2395-4edc-8491-f9e23fdb415c/490c1b74-5407-4ea4-853d-33a1a797c0f1_pngtree-no-photo-selfie-icon-image_1267182.jpg" class="chat__photo"></img>
            {{/if}}
          <a href="#" class="chat__name">${this.props.title}</a>
          {{#each this.messages}}
            {{this.title}}
          {{/each}}
          {{#Modal chatId="${this.props.selectedChat}"}}
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

const withChats: any = withStore((state) => {
  const selectedChatId: number | undefined = state.selectedChat;
  return {
    chats: [...(state.chats || [])],
    userId: state.user.id,
    messages: (state.messages || {})[selectedChatId as number] || [],
    selectedChat: state.selectedChat,
    avatar: state.selectedAvatar,
    title: state.selectedTitle
  };
  

});

Handlebars.registerHelper('ifCond', function(v1: number | string, v2: number | string, options: any) {
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
