import { Block } from '../../utils/Block';
import * as styles from './chat.module.scss';
import { withStore } from '../../utils/Store';
import { ChatInfo } from '../../api/ChatsApi';

interface ChatProps {
  id: number;
  title: string;
  unread_count: number;
  selectedChat: ChatInfo;
  events: {
    click: () => void;
  }
}

export class ChatBase extends Block {
  constructor(props: ChatProps) {
    super('div', {
      ...props,
      isSelected: props.id === props.selectedChat?.id,
      style: styles,
      events: {}
    }
    );
  }

  render() {
    return `
    <div class="{{ style.chat }} {{#if isSelected }}{{ style.chat--selected }}{{/if}}">
    {{title}}
    {{#if unread_count }}
        <span class="{{ styles.chat__badge }}">{{unread_count}}</span>
    {{/if}}
</div>
      `
  }
}

export const withSelectedChat: any = withStore(state => ({selectedChat: (state.chats || []).find(({id}) => id === state.selectedChat)}));
export const Chat = withSelectedChat(ChatBase);
