import { Block } from '../../utils/Block';
import styles from './button.module.css';

interface buttonProps {
    label: string;
    type: string;
    onClick: () => void

}

export class Button extends Block {
    constructor(props: buttonProps) {
        super('button', {
          label: props.label,
          type: props.type,
          style: styles,
          events: {
            click: props.onClick
          }
        });
    }
// lang=hbs
    render() {
            return `<button class="${ styles.button }" type="{{type}}" onClick=onClick>
        {{ label }}
    </button>`
    }
}