import { Block } from "./Block";
// @ts-ignore
import Handlebars from "handlebars";

export function registerComponent(name: string, Component: typeof Block) {
    Handlebars.registerHelper(name, ({data, fn, hash}) => {
        const component = new Component(hash);

        if (!data.root.children) {
            data.root.children = {};
        }

        data.root.children[component.id] = component;
// @ts-ignore
        const contents = fn ? fn(this) : '';

        return `<div data-id="${component.id}">${contents}</div>`;
    });
}   
