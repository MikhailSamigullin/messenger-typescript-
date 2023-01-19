import ChatController from '../../controller/ChatController';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import { Block } from '../../utils/Block';
import * as styles from './link.module.scss';

interface AddChatProps extends PropsWithRouter {
  to: string;
  label: string;
  type?: string;
  events: {
    click: () => void;
  };
}

export class AddChatBase extends Block {
  constructor(props: AddChatProps) {
    super('a', {
      ...props,
      style: styles,
      events: {
        click: (e: any) => {
          e.preventDefault();
          let titleChat: any = '';
          titleChat = prompt('Введите название чата');
          this.navigate();
          ChatController.create(titleChat);
        } 
      }
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
      return `<a class=chat-list__add-button onClick={{onClick}}>{{label}}</a>`
  }
}

export const AddChat = withRouter(AddChatBase);
