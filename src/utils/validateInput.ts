import validation from './validation';
import { inputFields } from '../data/inputFields';

export const validateInput = (e: FocusEvent) => {
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
  }
