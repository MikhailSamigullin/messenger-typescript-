import { Block } from '../../utils/Block';
import * as styles from './chat.module.css';
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

export const withSelectedChat = withStore(state => ({selectedChat: (state.chats || []).find(({id}) => id === state.selectedChat)}));

export const Chat = withSelectedChat(ChatBase);

// <div class="list">
      //   <div class="list__item">
      //     <a href="/message" class="list__photo"></a>
      //     <div class="list__chat">
      //       <a href="/{{this.id}}" class="list__name">{{this.name}}</a>
      //       <a href="/{{this.id}}" class="list__last-message"><span> {{this.yourMessage}} </span>{{this.lastMessage}}</a>
      //     </div>
      //     <div class="list__info">
      //       <div class="list__data">{{this.data}}</div>
      //       <a href="/{{this.id}}" class="list__unread-messages" {{this.hidden}}>{{this.unreadMessages}}</a>
      //     </div>
      //   </div>
      // </div>

      // <div class="{{ styles.chat }} {{#if isSelected }}{{ styles.chat--selected }}{{/if}}">
      //   {{title}}
      //   {{#if unread_count }}
      //       <span class="{{ styles.list__unread-messages }}">{{unread_count}}</span>
      //   {{/if}}
      // </div>
