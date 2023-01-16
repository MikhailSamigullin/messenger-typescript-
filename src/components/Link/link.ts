import AuthController from '../../controller/AuthController';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import { Block } from '../../utils/Block';
import Router from '../../utils/Router';
import * as styles from './link.module.css';

interface LinkProps extends PropsWithRouter {
  to: string;
  label: string;
  type?: string;
  events?: {
    click: () => void;
  };
}

export class BaseLink extends Block {
  constructor(props: LinkProps) {
    super('span', {
      ...props,
      style: styles,
      events: {
        click: (e: any) => {
          e.preventDefault();
          if (this.props.to === '/') {
            AuthController.logout();
          }
          if (this.props.to === '/changePassword') {
            Router.go('/changePassword')
          }
          if (this.props.to === '/changeProfile') {
            Router.go('/changeProfile')
          }
          if (this.props.to === '/changeAvatar') {
            Router.go('/changeAvatar')
          }
          this.navigate();
        } 
      }
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
      return `<a class={{class}} onClick={{onClick}} to={{to}}>{{label}}</a>`
  }
}

export const Link = withRouter(BaseLink);
