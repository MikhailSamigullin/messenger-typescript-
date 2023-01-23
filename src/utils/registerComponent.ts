import { Block } from "./Block";
import Handlebars from "handlebars";

export function registerComponent(name: string, Component: typeof Block) {
  Handlebars.registerHelper(name, ({data, fn, hash}: {data: any, fn: any, hash: any}) => {
    const component = new Component(hash);
    if (!data.root.children) {
      data.root.children = {};
    }
    data.root.children[component.id] = component;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const contents = fn ? fn(this) : '';
    return `<div data-id="${component.id}">${contents}</div>`;
  });
}
