// import MessagesController from '../../controller/MessagesController';
import { Block } from '../../utils/Block';
import Router from '../../utils/Router';
import * as styles from './backButton.module.css';

interface backButtonProps {
  label: string;
  type: string;
  href: string;
  onClick: () => void
}

export class BackButton extends Block {
  constructor(props: backButtonProps) {
    super('a', {
      ...props,
      style: styles,
      events: {
      click: (e: MouseEvent) => {
        e.preventDefault();
        const path = this.props.href;
        Router.go(path)
        

      } 
      }
    });
  }

  render() {
    return `<a class="sidebar" href="{{href}}" >
            {{ label }}
            </a>`
  }
}
