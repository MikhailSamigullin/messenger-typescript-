import { Block } from "./Block";
import Handlebars from "handlebars";

export function registerComponent(name: string, Component: typeof Block) {
  Handlebars.registerHelper(name, ({data, fn, hash}) => {
    const component = new Component(hash);
    if (!data.root.children) {
      data.root.children = {};
    }
    data.root.children[component.id] = component;
    const contents = fn ? fn(this) : '';
    return `<div data-id="${component.id}">${contents}</div>`;
  });
}
