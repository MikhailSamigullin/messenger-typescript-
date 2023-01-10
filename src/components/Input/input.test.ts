import Input from './index';
import { expect } from 'chai';

describe('Input', () => {
  it('should render', () => {
    new Input({ type: 'input', name: 'login', placeholder: ''});
  });

  it('element should return input', () => {
    const input = new Input({type: 'input', name: 'login', placeholder: 'Логин'});
    const element = input.element;

    expect(element).to.be.instanceof(window.HTMLInputElement);
  });

  it('getName should return name', () => {
    const input = new Input({type: 'input', name: 'login', placeholder: 'Логин'});
    const getName = input.getName();

    expect(getName).to.be.equal('login');
  });

  it('getValue should return value', () => {
    const input = new Input({type: 'input', name: 'login', placeholder: 'Логин'});
    input.setValue('some value');
    const getValue = input.getValue();

    expect(getValue).to.be.equal('some value');
  });

  it('placeholder should return placeholder value', () => {
    const input = new Input({type: 'input', name: 'login', placeholder: 'Логин'});
    input.setPlaceholder('Логин');
    const getPlaceholder = input.getPlaceholder();

    expect(getPlaceholder).to.be.equal('Логин');
  });
});
