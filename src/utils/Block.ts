import { EventBus } from "./EventBus";
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:rendeAr',
    FLOW_CDU: 'flow:component-did-update',
  };  

  private _element : HTMLElement | null = null;
  private _meta : {tagName: string, props: any};
  protected props: Record<string, unknown>;
  private eventBus: () => EventBus;
  public children: Record<string, Block>;//add1
  public id = nanoid(6);

  constructor(tagName: string = 'div', propsWithChildren: any = {}) {
    const eventBus = new EventBus();
    const {props, children} = this._getChildrenAndProps(propsWithChildren);
    this._meta = {
      tagName,
      props,
    };

    this.children = children;//add1

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }
//add1
  _getChildrenAndProps(ChildrenAndProps: any) {
    const children: Record<string, Block> = {};
    const props: Record<string, any> = {};

    Object.entries(ChildrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    })
    return {props, children};
  }
  //add1

  //add
  _addEvent() {
    const {events = {}} = this.props as {events: Record<string, () => void>};
    Object.keys(events).forEach(eventName => {
      this.element?.addEventListener(eventName, events[eventName]);
    })
  }
  //

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    // const { tagName } = this._meta;
    // this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {

  }

  _componentDidMount() {
    // @ts-ignore
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    // const response = this.componentDidUpdate(oldProps, newProps);

    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    // if (!response) {
    //   return;
    // }
    this._render();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: any, newProps: any): boolean {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }
//add1
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
  };
//add1
  _render() {
    const template = this.render();

    const fragment = this.compile(template, {...this.props, children: this.children});

    const newElement = fragment.firstElementChild as HTMLElement;

    this._element?.replaceWith(newElement);

    this._element = newElement;

    // this._element!.innerHTML = '';
    
    // this._element!.append(fragment);//change1

    this._addEvent();//add
  }

  // Может переопределять пользователь, необязательно трогать
  protected render(): string {
    return '';//add1
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: any) {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldProps = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show(): void {
    this.getContent()!.style.display = 'block';
  }

  hide(): void {
    this.getContent()!.style.display = 'none';
  }
}
