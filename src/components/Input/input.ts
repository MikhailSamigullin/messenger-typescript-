import { Block } from '../../utils/Block';
import * as styles from './input.module.css';
import { validateInput } from '../../utils/validateInput';

interface InputProps {
  type: string;
  name: string;
  // value: string;
  // text: string;
  required: string;
  inputFields: string[];
}

export class Input extends Block {
  constructor(props: InputProps) {
    super('input', {
      ...props,
      style: styles,
      events: {
      // focus: validateInput,
      // blur: validateInput,
      }
    });
  }
  public setValue(value: string) {
    return (this.element as HTMLInputElement).value = value;
  }

  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
      return `<input class=${styles.input} type={{type}} name={{name}} placeholder={{value}} required={{required}}>`
  }
}
