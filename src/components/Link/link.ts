import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import { Block } from '../../utils/Block';
import * as styles from './link.module.css';

interface LinkProps extends PropsWithRouter {
  to: string;
  label: string;
  events?: {
    click: () => void;
  };
}

export class BaseLink extends Block {
  constructor(props: LinkProps) {
    super('button', {
      ...props,
      style: styles,
      events: {
        click: () => this.navigate()
      }
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
      return `<a href={{to}} class=${styles.link} onClick={{onClick}}>{{label}}</a>`
  }
}

export const Link = withRouter(BaseLink);
