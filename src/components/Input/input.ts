import { Block } from '../../utils/Block';
import * as styles from './input.module.css';
import validation from '../../utils/validation';
import { inputFields } from '../../data/inputFields';

interface InputProps {
  type: string;
  name: string;
  value: string;
  text: string;
  required: string;
  inputFields: string[];
}

export class Input extends Block {
  constructor(props: InputProps) {
    super('input', {
      type: props.type,
      name: props.name,
      value: props.value,
      text: props.text,
      required: props.required,
      style: styles,
      events: {
      focus: (e: FocusEvent) => {
        e.preventDefault();
        const element = e.target as HTMLInputElement;
        const elementName: string = element.name;
        const valid: any =  validation(elementName, element.value);
        inputFields.map((item) => {
          if (elementName === item) {
            const label = document.querySelector(`#${item}`) as HTMLElement;
             label.textContent = valid.text;    
          }
        }) 
      },
      blur: (e: FocusEvent) => {
        e.preventDefault();
        const element = e.target as HTMLInputElement;
        const valid: any =  validation(element.name, element.value);
        inputFields.map((item) => {
          if (element.name === item) {
            const label = document.querySelector(`#${item}`) as HTMLElement;
             label.textContent = valid.text; 
          }
        })
      },
      submit: (e: MouseEvent) => {
        e.preventDefault();
      }
      }
    });
  }

  render() {
      return `<input class=${styles.input} type={{type}} name={{name}} placeholder={{value}} required={{required}}>`
  }
}
