declare module "*.hbs" {
  import { TemplateDelegate } from "hadlebars";
  declare const template: TemplateDelegate;
  export default template;
}
