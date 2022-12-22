import { Block } from '../../utils/Block';
import Chat from '../Chat/index';
import * as styles from './chatList.module.css';
import { withStore } from '../../utils/Store';
import { ChatInfo } from '../../api/ChatsApi';
import ChatsController from '../../controller/ChatController';
import MessagesController from '../../controller/MessagesController';
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
    this.children.chats = this.createChats(this.props);
    this.children.profileLink = new Link({ to: '/profile', label: 'Профиль'});
  }

  componentDidUpdate(oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
    this.children.chats = this.createChats(newProps);

    return true;
  }

  

  private createChats(props: ChatsListProps) {
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



  render()  {
    // console.log(this.children.chats)
// console.log(this.data)
    return `
<div>
        <aside class="{{ styles.chats-list }}">
    {{#if ${this.props.isLoaded} }}
    {{#each chats}}
            <div class="list">
            <div class="list__item">
              <a href="/message" class="list__photo"></a>
              <div class="list__chat">
                <a href="/message?{{this.id}}" class="list__name">{{this.title}}</a>
                <a href="/message" class="list__last-message"><span> last</span> message</a>
              </div>
              <div class="list__info">
                <div class="list__data">{{this.created}}</div>
                <a href="" class="list__unread-messages">{{this.unread}}</a>
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

const withChats = withStore((state) => ({chats: [...(state.chats || [])]}));

export const ChatsList = withChats(ChatsListBase);
      //     <aside class="{{ styles.chats-list }}">
      // {{#if isLoaded }}
      //     {{#each chats}}
      //         {{{this}}}
      //     {{/each}}
      //     {{{profileLink}}}
      // {{else}}
      //   Loading...
      // {{/if}}
      // </aside>
