import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import { Block } from '../../utils/Block';
import * as styles from './modal.module.css';

interface ModalProps extends PropsWithRouter {
  to: string;
  label: string;
  type?: string;
  events: {
    click: () => void;
  };
}

export class ModalBase extends Block {
  constructor(props: ModalProps) {
    super('a', {
      ...props,
      style: styles,
      events: {
        click: (e: any) => {
          const modal:any = document.getElementById("myModal");
          const btn:any = document.getElementById("myBtn");
          const span:any = document.getElementsByClassName("close")[0];

          btn.onclick = function() {
            modal.style.display = "block";
          }
          span.onclick = function() {
            modal.style.display = "none";
          }
          window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          }
        } 
      }
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
      return `
      <div>
        <button href="#" id="myBtn" class="chat__menu"> </button>
        <div id="myModal" class="modal">
          <div class="modal-content">
            <span class="close">
              &times;
            </span>
            <div>
              Добавить пользователя в чат
            </div>
            <br>
            <form method="put" onClick="submit">
              <input type="input" name="name" placeholder="id_пользователя">
              
              <br>
              {{#Button type="submit"}}
                Добавить
              {{/Button}}
            <br>
            <div>
              Удалить пользователя из чата
            </div>
            <br>
            <form method="put" onClick="submit">
              <input type="input" name="id_user" placeholder="id_пользователя">
              <br>
              {{#Button type="submit"}}
                Удалить
              {{/Button}}
            <form>
            <br>
            {{#DeleteLink }}
              Удалить чат
            {{/DeleteLink}}
          </div>
        </div>
      </div>
          `
  }
}

export const Modal = withRouter(ModalBase);
