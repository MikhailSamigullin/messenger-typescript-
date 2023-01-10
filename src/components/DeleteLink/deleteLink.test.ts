import DeleteLink from './index';
import { expect } from 'chai';

describe('DeleteLink', () => {
  it('should render', () => {
    new DeleteLink({ to: '/' });
  });

  it('element should return anchor', () => {
    const link = new DeleteLink({ to: '/' });
    const element = link.element;

    expect(element).to.be.instanceof(window.HTMLAnchorElement)
  });
});
