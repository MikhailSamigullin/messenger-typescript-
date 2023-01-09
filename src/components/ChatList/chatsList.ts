import { Block } from '../../utils/Block';
import Chat from '../Chat/index';
import * as styles from './chatList.module.css';
import { withStore } from '../../utils/Store';
import { ChatInfo } from '../../api/ChatsApi';
import ChatsController from '../../controller/ChatController';
import Router from '../../utils/Router';

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
        click: (e: MouseEvent) => {
          e.preventDefault();
          const path = (e.target as any).name;
          let title = '';
          let avatar = '';
          ChatsController.selectChat(+path);
          const arr = this.props.chats.map((item: any) => {
              if (item.id === +path) {
                title = item.title;
                avatar = item.avatar;
              }
            })
            arr;
          ChatsController.selectTitle(title);
          ChatsController.selectAvatar(avatar);
          Router.go(`/message`)
        }
      }
    });
  }

  init() {
    this.children.chats = this.createChats(this.props) as any;
  }

  componentDidUpdate(oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
    this.children.chats = this.createChats(newProps) as any;
    oldProps;
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
            <a name="{{this.id}}" class="list__photo" onclick="click">
              {{#if this.avatar}}
                <img name="{{this.id}}" src="https://ya-praktikum.tech/api/v2/resources/{{this.avatar}}" class="list__photo"></img>
              {{else}}
                <img name="{{this.id}}" src="https://ya-praktikum.tech/api/v2/resources/235bb159-2395-4edc-8491-f9e23fdb415c/490c1b74-5407-4ea4-853d-33a1a797c0f1_pngtree-no-photo-selfie-icon-image_1267182.jpg" class="list__photo"></img>
              {{/if}}
            </a>
            <div class="list__chat">
              <a name="{{this.id}}" class="list__name">{{this.title}}</a>
              <a name="{{this.id}}" class="list__last-message"><span> {{this.last_message.user.first_name}}</span> :{{this.last_message.content}}</a>
            </div>
            <div class="list__info">
              <div class="list__data" name="{{this.id}}"></div>
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


const withChats: any = withStore((state) => ({chats: [...(state.chats || [])],
  selectedChat: (state.chats || []).find(({id}) => id === state.selectedChat)
}));
export const ChatsList = withChats(ChatsListBase);
