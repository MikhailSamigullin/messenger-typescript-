import { Block } from '../../utils/Block';
import * as styles from './chatList.module.css';

interface ChatCardProps {
  name: string;
  yourMessage: string;
  chatList: any;
  lastMessage: string;
  data: string;
  id: string;
  hidden: string;
  unreadMessages: string;
}

export class ChatCard extends Block {
  constructor(props: ChatCardProps) {
    super('div', {
      ...props,
      style: styles,
      events: {}
      }
    );
  }

  render() {
    return `
      <div class="list">
        <div class="list__item">
          <a href="/message" class="list__photo"></a>
          <div class="list__chat">
            <a href="/{{this.id}}" class="list__name">{{this.name}}</a>
            <a href="/{{this.id}}" class="list__last-message"><span> {{this.yourMessage}} </span>{{this.lastMessage}}</a>
          </div>
          <div class="list__info">
            <div class="list__data">{{this.data}}</div>
            <a href="/{{this.id}}" class="list__unread-messages" {{this.hidden}}>{{this.unreadMessages}}</a>
          </div>
        </div>
      </div>`
  }
}
