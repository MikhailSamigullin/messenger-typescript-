import { Block } from '../../utils/Block';
import * as styles from './button.module.scss';

interface buttonProps {
  label: string;
  type: string;
}

export class Button extends Block {
  constructor(props: buttonProps) {
    super('button', {
      ...props,
      style: styles,
    });
  }

  render() {
      return `<button class="button" type="{{type}}" onclick="{{onClick}}">
                {{ label }}
              </button>`
  }
}
