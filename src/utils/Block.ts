/* eslint-disable @typescript-eslint/no-empty-function */
import { EventBus } from "./EventBus";
import Handlebars from 'handlebars'; 
import { makeId } from './helpers';


type Props<P extends Record<string, unknown> = any> = { events?: Record<string, () => void>} & P;

export class Block<P extends Record<string, unknown> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:rendeAr',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount'
  } as const;  

  private _element : HTMLElement | null = null;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private _meta : {tagName: string, props: unknown};
  protected props: Props<P>;
  private eventBus: () => EventBus;
  public children: Record<string, Block<any>>;
  public id: string = makeId(6);

  constructor(tagName = 'div', propsWithChildren: Props = {} as Props<P>) {
    const eventBus = new EventBus();
    const {props, children} = this._getChildrenAndProps(propsWithChildren);
    this._meta = {
      tagName,
      props,
    };

    this.children = children;

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(ChildrenAndProps: Props<P>): {props:Props<P>, children: Record<string, Block>} {
    const children: Record<string, Block> = {};
    const props = {} as Props;


    Object.entries(ChildrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0 && value.every(v => v instanceof Block)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        children[key as string] = value;
      } else if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return {props: props as Props<P>, children};
  }

  private _removeEvents() {
    const { events } = this.props;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  private _addEvent() {
    const { events } = this.props;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
  }

  private _init() {

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    
  Object.values(this.children).forEach(child => {
    if (Array.isArray(child)) {
      child.forEach(ch => ch.dispatchComponentDidMount());
    } else {
      child.dispatchComponentDidMount();
    }
  });
}

  _componentDidUpdate(oldProps: Props<P>, newProps: Props<P>) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    this._render();
  }
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  componentDidUpdate(oldProps: Props<P>, newProps: Props<P>): boolean {
    if (oldProps.buttonText !== newProps.buttonText) {
      this.children.button.setProps({ text: newProps.buttonText });
  }
    return true;
  }

  private _componentWillUnmount() {
    this.eventBus().delete();
    this.componentWillUnmount();
  }

  componentWillUnmount() {
    console.count('componentWillUnmount')
    this.eventBus().delete();
  }

  setProps = (nextProps: Partial<Props<P>>) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };
  
  get element() {
    return this._element;
  }

  protected compile(template: string, context: any) {
    const contextAndStubs = { ...context};
    const compiled = Handlebars.compile(template);
    const temp = document.createElement('template');
    temp.innerHTML = compiled(contextAndStubs);

    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
      if (!stub) {
        return;
      }
      stub.replaceWith(component.getContent()!);
      component.getContent()?.append(...Array.from(stub.childNodes));
    })

    return temp.content;
  }

  _render() {
    const template = this.render();
    const fragment = this.compile(template, {...this.props, children: this.children});
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement as HTMLElement;
    this._addEvent();
  }

  protected render(): string {
    return '';
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Props<P>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as string];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldProps = { ...target };
        target[prop as keyof Props<P>] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show(): void {
    this.getContent()!.style.display = 'block';
  }

  hide(): void {
    this.getContent()!.style.display = 'none';
  }
}
