import { makeId } from './helpers';
import { expect } from 'chai';


describe('makeId', () => {
  const number = 6;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  it('makeId should create string', () => {
    const valueOne = makeId(number);

    expect(valueOne).to.be.an('string');
  });

  it('makeId should create string in 6 char', () => {
    const valueTwo = makeId(number).length;

    expect(valueTwo).to.eq(6);
  });

  it('string should contain right characters', () => {
    const valueThree = makeId(number);

    for (let i = 0; i < valueThree.length; i++) {
      expect(characters).to.be.includes(valueThree[i]);
    }
  });
});

