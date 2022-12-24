import ChatController from '../../controller/ChatController';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import { Block } from '../../utils/Block';
import * as styles from './deleteLink.module.css';

interface DeleteLinkProps extends PropsWithRouter {
  to: string;
  label: string;
  type?: string;
  events: {
    click: () => void;
  };
}

export class BaseDeleteLink extends Block {
  constructor(props: DeleteLinkProps) {
    super('span', {
      ...props,
      style: styles,
      events: {
        click: (e: any) => {
          e.preventDefault();
          const path = +window.location.search.slice(1);
          ChatController.delete(path);
          this.navigate();
        } 
      }
    });
  }

  navigate() {
    this.props.router.go('/chat');
  }

  render() {
    return `<a class=${styles.link} onClick={{onClick}}>{{label}}</a>`
  }
}

export const DeleteLink = withRouter(BaseDeleteLink);
