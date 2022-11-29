import { inputFields } from '../../data/inputFields';
import { Block } from '../../utils/Block';
import validation from '../../utils/validation';
import * as styles from './button.module.css';

interface buttonProps {
  label: string;
  type: string;
  inputFields: string[];
  click: () => void;
}

const data: {
  login: string, 
  password: string, 
  email: string, 
  firstName: string, 
  secondName: string, 
  phone: string
} = {
  login: '',
  password: '',
  email: '',
  firstName: '',
  secondName: '',
  phone: '',
}


export class Button extends Block {
  constructor(props: buttonProps) {
    super('button', {
      label: props.label,
      type: props.type,
      style: styles,
      events: {
      submit: (e: Event) => {
        e.preventDefault();
        const element = e.target as HTMLInputElement;
        const valid: any =  validation(element.name, element.value);
        inputFields.map((item) => {
          if (element.name === item) {
            const label = document.querySelector(`#${item}`) as HTMLElement;
             label.textContent = valid.text; 
          }
        }) 
        const loginInput = document.querySelector("input[name='login']") as HTMLInputElement;
        const passwordInput = document.querySelector("input[name='password']") as HTMLInputElement;
        const emailInput = document.querySelector("input[name='email']") as HTMLInputElement;
        const secondNameInput = document.querySelector("input[name='second_name']") as HTMLInputElement;
        const firstNameInput = document.querySelector("input[name='first_name']") as HTMLInputElement;
        const phoneInput = document.querySelector("input[name='phone']") as HTMLInputElement;

        if (loginInput) {
          data.login = loginInput.value;
        }
        if (passwordInput) {
          data.password = passwordInput.value;
        }
        if (emailInput) {
          data.email = emailInput.value;
        }
        if (secondNameInput) {
          data.secondName = secondNameInput.value;
        }
        if (firstNameInput) {
          data.firstName = firstNameInput.value;
        }
        if (phoneInput) {
          data.phone = phoneInput.value;
        }
        console.log(data);
      }
      }
    });
  }

  render() {
      return `<button class="${ styles.button }" type="{{type}}" onclick=onClick>
                {{ label }}
              </button>`
  }
}
