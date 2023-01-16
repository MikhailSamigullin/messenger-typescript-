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

  _addEvent() {
    const {events = {}} = this.props;
    Object.keys(events).forEach(eventName => {
      this.element?.addEventListener(eventName, events[eventName]);
    })
  }

  _removeEvents() {
    const {events = {}} = this.props as {events: Record<string, () => void>};
    if (!events || !this._element) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this.element?.removeEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  // _createResources() {

  // }

  private _init() {
    // this._createResources();

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
    return true;
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
    console.log('compile');
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
    this._element?.replaceWith(newElement);
    this._element = newElement;
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
