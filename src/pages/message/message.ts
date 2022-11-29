import { Block } from '../../utils/Block';
import { messages } from '../../data/messages';

interface MessagePageProps {
  messages: object,
  name: string;
  message: string;
  data: string;
  id: string;
  areYouOwner: string;
}

export class MessagePage extends Block {
  [x: string]: any;
  constructor(props: MessagePageProps) {
    super('div', props);
    this.setProps({
      messages: messages,
			name: props.name,
      message: props.message,
      areYouOwner: props.areYouOwner,
      data: props.data,
      id: props.id
			},
    )
    
  }

  render() {
    return `  
      <main class="chat">
        <div class="chat__header">
          {{#BackButton href="/chat"}}
          {{/BackButton}}
          <a href="#" class="chat__photo"></a>
          <a href="#" class="chat__name">{{this.name}}</a>
          <a href="#" class="chat__menu"></a>
        </div>
        <div class="dialog">
          {{#each messages}}
            {{#Message message=this.message data=this.data}}
            {{/Message}}
          {{/each}}
        </div>
          <form class="chat__footer" >
            <a href="#" class="chat__upload"></a>
            <input type="text" 
            class="chat__message"
            placeholder="Сообщение"
            name="message"
            required></input>
            <button type="submit" class="chat__button"></button>
          </form>
        </div>
      </main>
  `
  }
}