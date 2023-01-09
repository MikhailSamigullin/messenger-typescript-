import { Block } from '../../utils/Block';
import * as styles from './button.module.css';

interface buttonProps {
  label: string;
  type: string;
  // inputFields: string[];
  // events: {
  //   click: () => void;
  // };
}

export class Button extends Block {
  constructor(props: buttonProps) {
    super('button', {
      ...props,
      style: styles,
      // events: {
      //   // click: () => this.onSubmit()
      // }
    });
  }
  // onSubmit() {
  //   console.log("submit");
  // }

  render() {
      return `<button class="${styles.button}" type="{{type}}" onclick="{{onClick}}">
                {{ label }}
              </button>`
  }
}
