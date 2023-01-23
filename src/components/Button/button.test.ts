import Button from './index';
import { expect } from 'chai';

describe('Button', () => {
  it('should render', () => {
    new Button({ type: 'button',
    label: 'button' });
  });

  it('element should return button', () => {
    const link = new Button({ type: 'button',
    label: 'button' });
    const element = link.element;

    expect(element).to.be.instanceof(window.HTMLButtonElement)
  });

});
