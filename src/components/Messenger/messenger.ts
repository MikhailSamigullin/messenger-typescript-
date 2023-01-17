import { Block } from '../../utils/Block';
import * as styles from './messenger.module.css';
// import Message from '../Message/index';
import { Input } from '../Input/input';
import MessagesController, { Message as MessageInfo } from '../../controller/MessagesController';
import { withStore } from '../../utils/Store';

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
    userId: state.user.id,
    
  };
});

export const Messenger = withSelectedChatMessages(MessengerBase);
