import { Block } from '../../utils/Block';
import * as styles from './message.module.css';

interface MessageProps {
  content: string;
  isMine: boolean;
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
    return `
    <div class="{{ styles.message }} {{#if isMine}} {{ styles.message--mine }} {{/if}}">
    {{ content }}
  </div>
    `
  }
}
