import AuthController from '../../controller/AuthController';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import { Block } from '../../utils/Block';
import * as styles from './link.module.css';

interface LinkProps extends PropsWithRouter {
  to: string;
  label: string;
  type?: string;
  events: {
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
          AuthController.logout();
          this.navigate();
          console.log('navigate')
        } 
        
      }
    });
  }



  navigate() {
    this.props.router.go(this.props.to);
    console.log(Object.entries(this.props) )
  }

  render() {
      return `<a class=${styles.link} onClick={{onClick}}>{{label}}</a>`
  }
}

export const Link = withRouter(BaseLink);
