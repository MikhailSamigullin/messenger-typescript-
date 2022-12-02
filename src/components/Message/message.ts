import { Block } from '../../utils/Block';
import * as styles from './message.module.css';

interface MessageProps {
  message: string;
  data: string;
  id: string;
  areYouOwner: string;
  style: any;
}

export class Message extends Block {
  [x: string]: any;
  constructor(props: MessageProps) {
    super('div', {
      ...props,
      style: styles,
      events: {}
      }
    );
  }

  render() {
    console.log(this.style);
    return `
      <div class="${ styles.message }">
        <div class="${ styles.message__text }">
          {{name}} {{message}}
        </div>
        <div class="${ styles.data }">
          {{data}}
        </div>
      </div>>`
  }
}
