import { Block } from '../../utils/Block';
// import { chatList } from '../../data/chatList';
import ChatsList from '../../components/ChatList';
import Messenger from '../../components/Messenger';
import ChatsController from '../../controller/ChatController';
import Input from '../../components/Input';
import MessagesController from '../../controller/MessagesController';

interface ChatPageProps {
  name: string;
  yourMessage: string;
  chatList: any;
  lastMessage: string;
  data: string;
  id: string;
  hidden: string;
  unreadMessages: string;
  value: string;
  chats: any;
}

export class ChatPage extends Block {
  constructor(props: ChatPageProps) {
    super('', props);   
    this.setProps({
      chats: props.chats,
      // id: props.chats.id,
      events: {
      click: () => {
        

        //  const input = this.children.input as Input;
        //  const message = input.getValue();

        //  input.setValue('');

        //  MessagesController.sendMessage(this.props.selectedChat!, message);
      }
    }
    })
  }

  init() {
    this.children.chatsList = new ChatsList({ isLoaded: false });
    
    this.children.messenger = new Messenger({});
// console.log(this.children.messenger)
    ChatsController.fetchChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true
      })
    });
  }

  render() {
    console.log(this)
    return `  

    <div class="chat-list">
      {{#ChatList isLoaded="true"}}
      {{/ChatList}}
    </div>
    

            
  `
  }
}


    // ChatsController.fetchChats().finally(() => {
    //   (this.children.chatsList as Block).setProps({
    //     isLoaded: true
    //   })
    // });



    // <main class="chat__container">
            //   {{#BackButton href="/"}}
            //   {{/BackButton}}
            //   <div class="chat-list">
            //     <div class="chat-list__profile">
            //       <a href="#" class="chat-list__add-button">+ Новый чат</a>
            //       <a href="/profile" class="">Профиль</a>
            //     </div>
            //     <div class="chat-list__search">
            //       <input type="search" 
            //         name="search" 
            //         id="search"
            //         placeholder="Поиск">
            //     </div>
            //     <div class="list">
            //       {{#each chatList}}
            //         {{#ChatCard name=this.name
            //           id=this.id
            //           yourMessage=this.yourMessage
            //           lastMessage=this.lastMessage
            //           data=this.data
            //           hidden=this.hidden
            //           unreadMessages=this.unreadMessages
            //         }}
            //         {{/ChatCard}}
            //       {{/each}}
            //     </div>
            //   </div>
            // </main>   


    //         <div class="{{ styles.messenger-page }}">
    //   {{#ChatList isLoaded="false" }}
    //   {{/Chatlist}}
    //   {{#Messenger}}
    //     {{#Input type="text" placeholder="Сообщение" name="message" required=required}}
    //     {{/Input}}

    //   {{/Messenger}}
    // </div>
