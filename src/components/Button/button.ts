import { Block } from '../../utils/Block';
import * as styles from './button.module.css';

interface buttonProps {
  label: string;
  type: string;
  inputFields: string[];
}

export class Button extends Block {
  constructor(props: buttonProps) {
    super('button', {
      ...props,
      style: styles,
      events: {
      }
    });
  }

  render() {
      return `<button class="${ styles.button }" type="{{type}}">
                {{ label }}
              </button>`
  }
}
