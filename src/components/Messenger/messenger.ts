import { Block } from '../../utils/Block';
import * as styles from './messenger.module.css';
import Message from '../Message/index';
import { Input } from '../Input/input';
import Button from '../Button/index';

import MessagesController, { Message as MessageInfo } from '../../controller/MessagesController';
import { withStore } from '../../utils/Store';
import message from '../../pages/message';
import Chat from '../Chat';
import ChatsController from '../../controller/ChatController';

interface MessengerProps {
  selectedChat: number | undefined;
  messages: MessageInfo[];
  userId: number;
}

export class MessengerBase extends Block {
  [x: string]: any;
  constructor(props: MessengerProps) {
    super('div', {
      ...props,
      style: styles,
      events: {
        click: () => {
          const input = this.children.input as Input;
          const message = input.getValue();

          input.setValue('');

          MessagesController.sendMessage(this.props.selectedChat!, message);
          
        }
      }
      }
    );


    // console.log(this.props);
    // console.log(this.children.chats)

  }

  private createChats(props: any) {
    return props.chats.map(data => {
      // console.log(data.id)
      return new Chat({
        ...data,
      id: this.props.id,

        events: {
          click: (e) => {

            e.preventDefault();
            ChatsController.selectChat(data.id);

          }
        }
      });
    })
  }


  componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
    this.children.messages = this.createMessages(newProps);
    return true;
  }

  createMessages(props: MessengerProps) {
    // console.log(this.props.messages);

    return props.messages.map(data => {
      return new Message({...data, isMine: props.userId === data.user_id });
    })
  }


  render() {
    // console.log(this);
    return `
    <div>
    {{#each messages}}
                {{this}}
    {{/each}}
      {{#Input type="text" value="Сообщение" name="message"}}
      {{/Input}}
      {{#Button type="button"}}
      Отправить
      {{/Button}}

    </div>
    `
  }
}

// <div class="{{ styles.message }} {{#if isMine}} {{ styles.message--mine }} {{/if}}">
//       {{ content }}
//     </div>

const withSelectedChatMessages = withStore(state => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id
  };
});




  // protected init() {
  //   this.children.messages = this.createMessages(this.props);

  //   this.children.input = new Input({
  //     type: 'text',
  //     placeholder: 'Сообщение',
  //     name: 'message'
  //   });

  //   this.children.button = new Button({
  //     label: 'Отправить',
  //     type: 'button',
      
  //   });
  // }


export const Messenger = withSelectedChatMessages(MessengerBase);
