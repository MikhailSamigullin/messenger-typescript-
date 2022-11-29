import { Block } from '../../utils/Block';
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
      label: props.label,
      type: props.type,
      href: props.href,
      style: styles,
      events: {
      click: props.onClick
      }
    });
  }

  render() {
    return `<a class="${ styles.sidebar }" href="{{href}}" >
            {{ label }}
            </a>`
  }
}
