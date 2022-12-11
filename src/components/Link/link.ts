import { Block } from '../../utils/Block';
import * as styles from './link.module.css';

interface LinkProps {
  label: string;
  href: string;

}

export class Link extends Block {
  constructor(props: LinkProps) {
    super('button', {
      ...props,
      style: styles,
      events: {
      }
    });
  }

  render() {
      return `<a href={{href}} class=${styles.link}>{{label}}</a>`
  }
}
