import { Block } from '../../utils/Block';
import Chat from '../Chat/index';
import * as styles from './chatList.module.css';
import { withStore } from '../../utils/Store';
import { ChatInfo } from '../../api/ChatsApi';
import ChatsController from '../../controller/ChatController';
import Link from '../Link/index';

interface ChatsListProps {
  unread: string;
  created: string;
  avatar: any;
  title: string;
  id: string;
  chats: ChatInfo[];
  isLoaded: boolean;
}

class ChatsListBase extends Block{
  constructor(props: ChatsListProps) {
    super('div', {
      ...props,
      style: styles,
      isLoaded: props.isLoaded,
      id: props.id,
      title: props.title, 
      avatar: props.avatar, 
      created_by: props.created, 
      unread_count: props.unread,
      events: {
      }
    });
  }

  init() {
    this.children.chats = this.createChats(this.props) as any;
    this.children.profileLink = new Link({ to: '/profile', label: 'Профиль'}) as any;
  }

  componentDidUpdate(oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
    this.children.chats = this.createChats(newProps) as any;
    return true;
  }

  private createChats(props: ChatsListProps) {
    return props.chats.map(data => {
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

  render()  {
    return `
<div>
        <aside class="{{ styles.chats-list }}">
    {{#if ${this.props.isLoaded} }}
    {{#each chats}}
            <div class="list">
            <div class="list__item">
              <a href="/message?{{this.id}}" class="list__photo"></a>
              <div class="list__chat">
                <a href="/message?{{this.id}}" class="list__name">{{this.title}}</a>
                <a href="/message?{{this.id}}" class="list__last-message"><span> {{this.last_message.user.first_name}}</span> :{{this.last_message.content}}</a>
              </div>
              <div class="list__info">
                <div class="list__data">{{this.created}}</div>
              </div>
            </div>
          </div>
        {{/each}}
    {{else}}
      Loading...
    {{/if}}
    </aside>
  </div>
      `;
  }
}

const withChats: any = withStore((state) => ({chats: [...(state.chats || [])]}));
export const ChatsList = withChats(ChatsListBase);
