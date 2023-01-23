import { Block } from '../../utils/Block';
import * as styles from './input.module.scss';
import { validateInput } from '../../utils/validateInput';

interface InputProps {
  type: string;
  name?: string;
  required?: string;
  inputFields?: string[];
  placeholder?: string;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super('input', {
      ...props,
      style: styles,
      events: {
      focus: validateInput,
      blur: validateInput,
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

  public getPlaceholder() {
    return (this.element as HTMLInputElement).placeholder;
  }

  public setPlaceholder(placeholder: string) {
    return (this.element as HTMLInputElement).placeholder = placeholder;
  }

  render() {
      return `<input class=${styles.input} type={{type}} name={{name}} placeholder={{value}} value={{oldValue}} >`
  }
}
