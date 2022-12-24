import { Block } from '../../utils/Block';
import * as styles from './messenger.module.css';
import Message from '../Message/index';
import { Input } from '../Input/input';
import MessagesController, { Message as MessageInfo } from '../../controller/MessagesController';
import { withStore } from '../../utils/Store';
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
  }

  private createChats(props: any) {
    return props.chats.map((data: { id: number; }) => {
      return new Chat({
        ...data,
      id: this.props.id,
        events: {
          click: (e: MouseEvent) => {
            e.preventDefault();
            ChatsController.selectChat(data.id);
          }
        }
      });
    })
  }

  componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
    this.children.messages = this.createMessages(newProps) as any;
    return true;
  }

  createMessages(props: MessengerProps) {
    return props.messages.map(data => {
      return new Message({...data, isMine: props.userId === data.user_id });
    })
  }

  render() {
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

const withSelectedChatMessages: any = withStore(state => {
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

export const Messenger = withSelectedChatMessages(MessengerBase);
