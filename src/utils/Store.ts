import { set } from './helpers';
import { EventBus } from './EventBus';
import { User } from '../api/AuthApi';
import { ChatInfo } from '../api/ChatsApi';
import { Message } from '../controller/MessagesController';

export enum StoreEvents {
  Updated = 'updated'
}

interface State {
  selectedTitle: string;
  selectedAvatar: string;
  title: string;
  avatar: string;
  user: User;
  chats: ChatInfo[];
  messages: Record<number, Message[]>;
  selectedChat?: number;
}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }

  dispatch(nextStateOrAction: any, payload?: any) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set(this.state, nextStateOrAction );
    }
  }
}

const store = new Store();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store;

export function withStore<SP>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Component: any){

    return class WithStore extends Component {

      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...(props as P), ...previousState });
        store.delete();

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    }
  }
}

export default store;
